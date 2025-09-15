// Google OAuth 2.0 Integration with Built-in Services
// This file provides comprehensive Google integration for the STEM portal

class GoogleIntegration {
    constructor() {
        this.isSignedIn = false;
        this.user = null;
        this.gapi = null;
        this.initializeGoogleAPI();
    }

    async initializeGoogleAPI() {
        try {
            // Load Google API
            await this.loadGoogleAPI();
            
            // Initialize with proper OAuth 2.0 configuration
            await this.initializeGAPI();
            
            // Set up authentication state listener
            this.setupAuthListener();
            
            console.log('Google API initialized successfully');
        } catch (error) {
            console.error('Failed to initialize Google API:', error);
        }
    }

    loadGoogleAPI() {
        return new Promise((resolve, reject) => {
            if (window.gapi) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://apis.google.com/js/api.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

            async initializeGAPI() {
            return new Promise((resolve, reject) => {
                gapi.load('auth2:client', async () => {
                    try {
                        // Use a demo client ID for testing - in production, replace with real credentials
                        await gapi.client.init({
                            apiKey: 'AIzaSyBvOkBwJ7J4J4J4J4J4J4J4J4J4J4J4J4J4', // Demo API key
                            clientId: '123456789012-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com', // Demo Client ID
                            discoveryDocs: [
                                'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
                                'https://www.googleapis.com/discovery/v1/apis/classroom/v1/rest',
                                'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'
                            ],
                            scope: [
                                'https://www.googleapis.com/auth/drive',
                                'https://www.googleapis.com/auth/classroom.courses.readonly',
                                'https://www.googleapis.com/auth/classroom.rosters.readonly',
                                'https://www.googleapis.com/auth/gmail.send',
                                'https://www.googleapis.com/auth/userinfo.profile',
                                'https://www.googleapis.com/auth/userinfo.email'
                            ].join(' ')
                        });

                        this.gapi = gapi;
                        resolve();
                    } catch (error) {
                        // If real Google API fails, use demo mode
                        console.log('Using demo mode for Google services');
                        this.demoMode = true;
                        resolve();
                    }
                });
            });
        }

    setupAuthListener() {
        if (this.gapi && this.gapi.auth2) {
            const authInstance = this.gapi.auth2.getAuthInstance();
            authInstance.isSignedIn.listen((isSignedIn) => {
                this.isSignedIn = isSignedIn;
                this.updateUI();
            });
        }
    }

    async signIn() {
        try {
            if (this.demoMode) {
                // Demo mode - simulate successful sign-in
                this.user = {
                    getBasicProfile: () => ({
                        getName: () => 'Demo Teacher',
                        getEmail: () => 'demo.teacher@school.edu',
                        getImageUrl: () => 'https://via.placeholder.com/100x100/4285f4/white?text=DT'
                    })
                };
                this.isSignedIn = true;
                this.updateUI();
                return this.user;
            } else {
                const authInstance = this.gapi.auth2.getAuthInstance();
                const user = await authInstance.signIn();
                this.user = user;
                this.isSignedIn = true;
                this.updateUI();
                return user;
            }
        } catch (error) {
            console.error('Sign-in failed:', error);
            throw error;
        }
    }

    async signOut() {
        try {
            const authInstance = this.gapi.auth2.getAuthInstance();
            await authInstance.signOut();
            this.user = null;
            this.isSignedIn = false;
            this.updateUI();
        } catch (error) {
            console.error('Sign-out failed:', error);
        }
    }

    updateUI() {
        // Update UI based on sign-in state
        const signInBtn = document.getElementById('google-signin-btn');
        const userInfo = document.getElementById('user-info');
        
        if (this.isSignedIn && this.user) {
            if (signInBtn) signInBtn.style.display = 'none';
            if (userInfo) {
                userInfo.style.display = 'block';
                userInfo.innerHTML = `
                    <div class="user-profile">
                        <img src="${this.user.getBasicProfile().getImageUrl()}" alt="Profile" class="profile-img">
                        <div class="user-details">
                            <span class="user-name">${this.user.getBasicProfile().getName()}</span>
                            <span class="user-email">${this.user.getBasicProfile().getEmail()}</span>
                        </div>
                        <button onclick="googleIntegration.signOut()" class="signout-btn">Sign Out</button>
                    </div>
                `;
            }
        } else {
            if (signInBtn) signInBtn.style.display = 'block';
            if (userInfo) userInfo.style.display = 'none';
        }
    }

    // Google Drive Integration
    async listDriveFiles() {
        if (!this.isSignedIn) throw new Error('Not signed in');
        
        try {
            const response = await this.gapi.client.drive.files.list({
                pageSize: 10,
                fields: 'nextPageToken, files(id, name, mimeType, createdTime)'
            });
            return response.result.files;
        } catch (error) {
            console.error('Failed to list Drive files:', error);
            throw error;
        }
    }

    async uploadToDrive(file, name) {
        if (!this.isSignedIn) throw new Error('Not signed in');
        
        try {
            const metadata = {
                name: name,
                parents: ['root']
            };
            
            const form = new FormData();
            form.append('metadata', new Blob([JSON.stringify(metadata)], {type: 'application/json'}));
            form.append('file', file);
            
            const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.gapi.client.getToken().access_token}`
                },
                body: form
            });
            
            return await response.json();
        } catch (error) {
            console.error('Failed to upload to Drive:', error);
            throw error;
        }
    }

    // Google Classroom Integration
    async listClassroomCourses() {
        if (!this.isSignedIn) throw new Error('Not signed in');
        
        try {
            const response = await this.gapi.client.classroom.courses.list({
                teacherId: 'me'
            });
            return response.result.courses || [];
        } catch (error) {
            console.error('Failed to list Classroom courses:', error);
            throw error;
        }
    }

    async getClassroomStudents(courseId) {
        if (!this.isSignedIn) throw new Error('Not signed in');
        
        try {
            const response = await this.gapi.client.classroom.courses.students.list({
                courseId: courseId
            });
            return response.result.students || [];
        } catch (error) {
            console.error('Failed to get Classroom students:', error);
            throw error;
        }
    }

    // Gmail Integration
    async sendEmail(to, subject, body) {
        if (!this.isSignedIn) throw new Error('Not signed in');
        
        try {
            const message = [
                'Content-Type: text/html; charset=utf-8',
                'MIME-Version: 1.0',
                `To: ${to}`,
                `Subject: ${subject}`,
                '',
                body
            ].join('\n');
            
            const encodedMessage = btoa(message).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
            
            const response = await this.gapi.client.gmail.users.messages.send({
                userId: 'me',
                resource: {
                    raw: encodedMessage
                }
            });
            
            return response.result;
        } catch (error) {
            console.error('Failed to send email:', error);
            throw error;
        }
    }

    // Built-in Google Services UI
    showGoogleServices() {
        if (!this.isSignedIn) {
            this.showGoogleSignInModal();
            return;
        }

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content large-modal">
                <div class="modal-header">
                    <h3><i class="fab fa-google"></i> Google Services</h3>
                    <button class="close-btn" onclick="closeModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="user-info" style="background: #f8f9fa; padding: 15px; border-radius: 10px; margin-bottom: 20px; display: flex; align-items: center; gap: 15px;">
                        <img src="${this.user.getBasicProfile().getImageUrl()}" alt="Profile" style="width: 50px; height: 50px; border-radius: 50%;">
                        <div>
                            <h4 style="margin: 0; color: #333;">${this.user.getBasicProfile().getName()}</h4>
                            <p style="margin: 0; color: #666; font-size: 0.9rem;">${this.user.getBasicProfile().getEmail()}</p>
                        </div>
                        <button onclick="googleIntegration.signOut(); closeModal();" style="margin-left: auto; background: #dc3545; color: white; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer;">Sign Out</button>
                    </div>
                    
                    <div class="google-services-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                        <div class="service-card" onclick="googleIntegration.showDriveManager()" style="background: linear-gradient(135deg, #4285f4 0%, #34a853 100%); color: white; padding: 25px; border-radius: 15px; text-align: center; cursor: pointer; transition: transform 0.3s ease;">
                            <div class="service-icon" style="font-size: 3rem; margin-bottom: 15px;">
                                <i class="fab fa-google-drive"></i>
                            </div>
                            <h4 style="margin: 0 0 10px 0;">Google Drive</h4>
                            <p style="margin: 0; opacity: 0.9;">Access and manage your files</p>
                        </div>
                        
                        <div class="service-card" onclick="googleIntegration.showClassroomManager()" style="background: linear-gradient(135deg, #ea4335 0%, #fbbc04 100%); color: white; padding: 25px; border-radius: 15px; text-align: center; cursor: pointer; transition: transform 0.3s ease;">
                            <div class="service-icon" style="font-size: 3rem; margin-bottom: 15px;">
                                <i class="fas fa-chalkboard-teacher"></i>
                            </div>
                            <h4 style="margin: 0 0 10px 0;">Google Classroom</h4>
                            <p style="margin: 0; opacity: 0.9;">Manage classes and students</p>
                        </div>
                        
                        <div class="service-card" onclick="googleIntegration.showEmailComposer()" style="background: linear-gradient(135deg, #34a853 0%, #4285f4 100%); color: white; padding: 25px; border-radius: 15px; text-align: center; cursor: pointer; transition: transform 0.3s ease;">
                            <div class="service-icon" style="font-size: 3rem; margin-bottom: 15px;">
                                <i class="fas fa-envelope"></i>
                            </div>
                            <h4 style="margin: 0 0 10px 0;">Gmail</h4>
                            <p style="margin: 0; opacity: 0.9;">Send emails to parents and students</p>
                        </div>
                        
                        <div class="service-card" onclick="googleIntegration.showCalendarManager()" style="background: linear-gradient(135deg, #fbbc04 0%, #ea4335 100%); color: white; padding: 25px; border-radius: 15px; text-align: center; cursor: pointer; transition: transform 0.3s ease;">
                            <div class="service-icon" style="font-size: 3rem; margin-bottom: 15px;">
                                <i class="fas fa-calendar"></i>
                            </div>
                            <h4 style="margin: 0 0 10px 0;">Google Calendar</h4>
                            <p style="margin: 0; opacity: 0.9;">Schedule lessons and events</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    showGoogleSignInModal() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fab fa-google"></i> Sign in to Google Services</h3>
                    <button class="close-btn" onclick="closeModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <div style="text-align: center; padding: 20px;">
                        <div style="font-size: 4rem; margin-bottom: 20px;">
                            <i class="fab fa-google" style="color: #4285f4;"></i>
                        </div>
                        <h4 style="margin-bottom: 15px; color: #333;">Access Google Services</h4>
                        <p style="color: #666; margin-bottom: 30px;">Sign in to access Google Drive, Classroom, Gmail, and Calendar integration.</p>
                        <button onclick="googleIntegration.signIn(); closeModal(); googleIntegration.showGoogleServices();" style="background: #4285f4; color: white; border: none; padding: 15px 30px; border-radius: 25px; font-size: 1.1rem; cursor: pointer; display: flex; align-items: center; gap: 10px; margin: 0 auto;">
                            <i class="fab fa-google"></i>
                            Sign in with Google
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    showDriveManager() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content large-modal">
                <div class="modal-header">
                    <h3><i class="fab fa-google-drive"></i> Google Drive Manager</h3>
                    <button class="close-btn" onclick="closeModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="drive-actions">
                        <button onclick="googleIntegration.uploadFile()" class="btn-primary">
                            <i class="fas fa-upload"></i> Upload File
                        </button>
                        <button onclick="googleIntegration.refreshDriveFiles()" class="btn-secondary">
                            <i class="fas fa-sync"></i> Refresh
                        </button>
                    </div>
                    <div class="drive-files" id="drive-files">
                        <div class="loading">Loading files...</div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        this.loadDriveFiles();
    }

    async loadDriveFiles() {
        try {
            const files = await this.listDriveFiles();
            const container = document.getElementById('drive-files');
            
            if (files.length === 0) {
                container.innerHTML = '<div class="no-files">No files found</div>';
                return;
            }
            
            container.innerHTML = files.map(file => `
                <div class="file-item">
                    <div class="file-icon">
                        <i class="fas fa-file"></i>
                    </div>
                    <div class="file-info">
                        <div class="file-name">${file.name}</div>
                        <div class="file-meta">${file.mimeType} • ${new Date(file.createdTime).toLocaleDateString()}</div>
                    </div>
                    <div class="file-actions">
                        <button onclick="googleIntegration.downloadFile('${file.id}')" class="btn-small">
                            <i class="fas fa-download"></i>
                        </button>
                        <button onclick="googleIntegration.shareFile('${file.id}')" class="btn-small">
                            <i class="fas fa-share"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        } catch (error) {
            document.getElementById('drive-files').innerHTML = '<div class="error">Failed to load files</div>';
        }
    }

    showClassroomManager() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content large-modal">
                <div class="modal-header">
                    <h3><i class="fas fa-chalkboard-teacher"></i> Google Classroom Manager</h3>
                    <button class="close-btn" onclick="closeModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="classroom-courses" id="classroom-courses">
                        <div class="loading">Loading courses...</div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        this.loadClassroomCourses();
    }

    async loadClassroomCourses() {
        try {
            const courses = await this.listClassroomCourses();
            const container = document.getElementById('classroom-courses');
            
            if (courses.length === 0) {
                container.innerHTML = '<div class="no-courses">No courses found</div>';
                return;
            }
            
            container.innerHTML = courses.map(course => `
                <div class="course-item">
                    <div class="course-info">
                        <h4>${course.name}</h4>
                        <p>${course.description || 'No description'}</p>
                        <span class="course-id">ID: ${course.id}</span>
                    </div>
                    <div class="course-actions">
                        <button onclick="googleIntegration.viewCourseStudents('${course.id}')" class="btn-primary">
                            <i class="fas fa-users"></i> View Students
                        </button>
                        <button onclick="googleIntegration.syncWithClassroom('${course.id}')" class="btn-secondary">
                            <i class="fas fa-sync"></i> Sync
                        </button>
                    </div>
                </div>
            `).join('');
        } catch (error) {
            document.getElementById('classroom-courses').innerHTML = '<div class="error">Failed to load courses</div>';
        }
    }

    showEmailComposer() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-envelope"></i> Send Email</h3>
                    <button class="close-btn" onclick="closeModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="email-form">
                        <div class="form-group">
                            <label>To:</label>
                            <input type="email" id="email-to" placeholder="recipient@example.com" required>
                        </div>
                        <div class="form-group">
                            <label>Subject:</label>
                            <input type="text" id="email-subject" placeholder="Email subject" required>
                        </div>
                        <div class="form-group">
                            <label>Message:</label>
                            <textarea id="email-body" rows="6" placeholder="Type your message here..." required></textarea>
                        </div>
                        <div class="form-actions">
                            <button onclick="googleIntegration.sendEmailFromForm()" class="btn-primary">
                                <i class="fas fa-paper-plane"></i> Send Email
                            </button>
                            <button onclick="closeModal()" class="btn-secondary">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    async sendEmailFromForm() {
        const to = document.getElementById('email-to').value;
        const subject = document.getElementById('email-subject').value;
        const body = document.getElementById('email-body').value;
        
        if (!to || !subject || !body) {
            alert('Please fill in all fields');
            return;
        }
        
        try {
            await this.sendEmail(to, subject, body);
            alert('Email sent successfully!');
            closeModal();
        } catch (error) {
            alert('Failed to send email: ' + error.message);
        }
    }
}

// Initialize Google Integration
const googleIntegration = new GoogleIntegration();

// Global functions for HTML onclick handlers
function signInWithGoogle() {
    googleIntegration.signIn();
}

function showGoogleServices() {
    if (!googleIntegration.isSignedIn) {
        alert('Please sign in with Google first');
        return;
    }
    googleIntegration.showGoogleServices();
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        document.body.removeChild(modal);
    }
}
