import re
import glob

replacements = [
    (
        "title: `📜 Perspective: Ocean Surfing`,\n                            content: `<div style=\"line-height:1.7;\">A surfer catches a wave, but is the water actually rushing forward?</div><div class=\"journal-box\" style=\"border-left-color:#667eea; background:rgba(102,126,234,0.1);\">Out in the deep ocean, water molecules just bob <strong>Up and Down</strong> when a wave passes. The wave is pure energy moving <em>through</em> the water. It’s only when the wave hits the shallow beach that the water is pushed forward and crashes!</div>`",
        "title: `📜 Historical Discovery: Measuring the Speed of Sound`,\n                            content: `<div style=\"line-height:1.7;\">In 1640, Pierre Gassendi correctly measured the speed of sound!</div><div class=\"journal-box\" style=\"border-left-color:#667eea; background:rgba(102,126,234,0.1);\">He used a cannon. By timing the flash of the gunpowder to the \"boom\" reaching his ears, he proved that wave energy (sound) travels at a specific speed through the air medium, much slower than light!</div>`"
    ),
    (
        "title: `📜 Perspective: Tsunami vs. Swell`,\n                            content: `<div style=\"line-height:1.7;\">Not all waves are created equal.</div><div class=\"journal-box\" style=\"border-left-color:#667eea; background:rgba(102,126,234,0.1);\">A gentle ocean swell has a very small <strong>Amplitude</strong> (maybe 1 foot tall). A tsunami has a massive <strong>Amplitude</strong> (up to 100 feet tall) carrying devastating energy. Wavelength matters, too: Tsunami peaks can be 100 miles apart!</div>`",
        "title: `📜 Historical Discovery: The First Seismograph`,\n                            content: `<div style=\"line-height:1.7;\">How did ancient scientists measure wave amplitude?</div><div class=\"journal-box\" style=\"border-left-color:#667eea; background:rgba(102,126,234,0.1);\">In 132 AD, Zhang Heng invented the first seismoscope in China! It was a giant bronze jar with dragons. When an earthquake wave arrived, the amplitude of the wave would knock a bronze ball into a toad's mouth, proving a wave had passed!</div>`"
    ),
    (
        "title: `📜 Perspective: Hearing Through the Ground`,\n                            content: `<div style=\"line-height:1.7;\">In the old days of railroads, people would put their ear to the steel train tracks.</div><div class=\"journal-box\" style=\"border-left-color:#ff9800; background:rgba(255,152,0,0.1);\">Why? Sound travels <strong>15 times faster</strong> through solid steel than it does through the air! The vibrations of the heavy train miles away would shake the steel track, allowing people to hear the train coming long before they could see it or hear it in the air.</div>`",
        "title: `📜 Historical Discovery: The First Phonograph`,\n                            content: `<div style=\"line-height:1.7;\">How did we first record sound waves?</div><div class=\"journal-box\" style=\"border-left-color:#667eea; background:rgba(102,126,234,0.1);\">In 1877, Thomas Edison invented the phonograph. He shouted into a horn, and the sound wave vibrations caused a needle to carve a physical wave pattern into a spinning cylinder of tin foil!</div>`"
    ),
    (
        "title: `📜 Perspective: Sunlight Journey`,\n                            content: `<div style=\"line-height:1.7;\">Light doesn't just instantly appear everywhere!</div><div class=\"journal-box\" style=\"border-left-color:#ff9800; background:rgba(255,152,0,0.1);\">Light from the sun takes about <strong>8 minutes and 20 seconds</strong> to travel the 93 million miles to Earth. If the sun suddenly disappeared, we wouldn't know about it until 8 minutes later!</div>`",
        "title: `📜 Historical Discovery: The Speed of Light`,\n                            content: `<div style=\"line-height:1.7;\">In 1676, Ole Rømer proved light isn't instantaneous!</div><div class=\"journal-box\" style=\"border-left-color:#667eea; background:rgba(102,126,234,0.1);\">By observing the eclipses of Jupiter's moons, he noticed they happened \"late\" when Earth was further away. He realized this delay was the time it took light waves to travel across space!</div>`"
    ),
    (
        "title: `📜 Perspective: Why is an Apple Red?`,\n                            content: `<div style=\"line-height:1.7;\">Objects don't actually \"contain\" color!</div><div class=\"journal-box\" style=\"border-left-color:#ff4444; background:rgba(244,67,54,0.1);\">A red apple looks red because it <strong>absorbs</strong> all the other colors of the sun's light (blue, green, yellow) and only <strong>reflects</strong> the red light waves into your eyes. If you shine only a blue light on a red apple, it looks black!</div>`",
        "title: `📜 Historical Discovery: The Color Spectrum`,\n                            content: `<div style=\"line-height:1.7;\">In 1666, Isaac Newton discovered the secret of color!</div><div class=\"journal-box\" style=\"border-left-color:#667eea; background:rgba(102,126,234,0.1);\">He used a glass prism to split white sunlight into a spectrum of colors. He proved that objects don't have their own color; they just reflect specific wavelengths of light into our eyes!</div>`"
    ),
    (
        "title: `📜 Perspective: Talking Drums of Africa`,\n                            content: `<div style=\"line-height:1.7;\">For centuries, people used sound waves to talk across vast distances.</div><div class=\"journal-box\" style=\"border-left-color:#9c27b0; background:rgba(156,39,176,0.1);\">In West Africa, \"Talking Drums\" were used to mimic the tone and rhythm of spoken language. By changing the pitch of the drum, musicians could broadcast warnings or news to neighboring villages faster than a person could run!</div>`",
        "title: `📜 Historical Discovery: The Talking Drums`,\n                            content: `<div style=\"line-height:1.7;\">For centuries, West African cultures used sound to transmit complex messages!</div><div class=\"journal-box\" style=\"border-left-color:#667eea; background:rgba(102,126,234,0.1);\">By changing the pitch (wavelength) of a drum, drummers could mimic the tonal spoken language, passing messages from village to village much faster than a person could run!</div>`"
    ),
    (
        "title: `📜 Perspective: The First Text Message`,\n                            content: `<div style=\"line-height:1.7;\">How do you send a message through a solid wire?</div><div class=\"journal-box\" style=\"border-left-color:#2196f3; background:rgba(33,150,243,0.1);\">Before telephones, we had the Telegraph. It sent long and short bursts of electrical energy (waves) down a wire. A long burst was a \"Dash\" and a short burst was a \"Dot.\" This simple code connected the whole world!</div>`",
        "title: `📜 Historical Discovery: The First Telegraph`,\n                            content: `<div style=\"line-height:1.7;\">In 1844, Samuel Morse sent the first long-distance electronic message!</div><div class=\"journal-box\" style=\"border-left-color:#667eea; background:rgba(102,126,234,0.1);\">He sent the message \"What hath God wrought\" from Washington D.C. to Baltimore. By tapping electrical pulses (waves of energy) onto a wire, he revolutionized global communication!</div>`"
    ),
    (
        "title: `📜 Perspective: 0 is Off, 1 is On`,\n                            content: `<div style=\"line-height:1.7;\">How does a computer read \"numbers\"?</div><div class=\"journal-box\" style=\"border-left-color:#4caf50; background:rgba(76,175,80,0.1);\">A computer only understands two things: Electrical Voltage is ON (1), or Voltage is OFF (0). By stringing together millions of these tiny 1s and 0s, a computer can build pictures, videos, and video games!</div>`",
        "title: `📜 Historical Discovery: The Boolean Logic`,\n                            content: `<div style=\"line-height:1.7;\">In 1847, George Boole invented the math behind computers!</div><div class=\"journal-box\" style=\"border-left-color:#667eea; background:rgba(102,126,234,0.1);\">He created \"Boolean algebra,\" where every equation evaluates to True (1) or False (0). Over 100 years later, engineers used his math to build the first digital circuits!</div>`"
    ),
    (
        "title: `📜 Perspective: Anatomy of an Eyeball`,\n                            content: `<div style=\"line-height:1.7;\">Your body is a natural radio receiver!</div><div class=\"journal-box\" style=\"border-left-color:#f44336; background:rgba(244,67,54,0.1);\">Inside your eye, the retina has millions of specialized cells (rods and cones). When specific wavelengths of light hit them, they trigger a tiny electrical signal that travels up your optic nerve to your brain. Your brain translates that signal into an image!</div>`",
        "title: `📜 Historical Discovery: The First Photograph`,\n                            content: `<div style=\"line-height:1.7;\">In 1826, Joseph Nicéphore Niépce captured the first permanent photograph!</div><div class=\"journal-box\" style=\"border-left-color:#667eea; background:rgba(102,126,234,0.1);\">He coated a metal plate in light-sensitive chemicals and exposed it to sunlight for 8 hours. The light waves transferred energy to the chemicals, permanently altering them to create an image!</div>`"
    ),
    (
        "title: `📜 Perspective: From Fire to Fiber Optics`,\n                            content: `<div style=\"line-height:1.7;\">We have always used light to communicate!</div><div class=\"journal-box\" style=\"border-left-color:#667eea; background:rgba(102,126,234,0.1);\">Ancient people used bonfires on hills to signal danger. Today, we shoot lasers through glass tubes (Fiber Optics) underneath the ocean. It's the same idea, just millions of times faster!</div>`",
        "title: `📜 Historical Discovery: Total Internal Reflection`,\n                            content: `<div style=\"line-height:1.7;\">In 1841, Daniel Colladon demonstrated a \"light pipe\"!</div><div class=\"journal-box\" style=\"border-left-color:#667eea; background:rgba(102,126,234,0.1);\">He shined a light through a stream of falling water. The light bounced off the inside of the water jet instead of escaping, proving that waves can be trapped and guided—the exact principle used in modern fiber optics!</div>`"
    ),
    (
        "title: `📜 Perspective: What is VR?`,\n                            content: `<div style=\"line-height:1.7;\">Tricking the brain!</div><div class=\"journal-box\" style=\"border-left-color:#9c27b0; background:rgba(156,39,176,0.1);\">Virtual Reality works by sending customized light waves to each eye independently, and playing customized sound waves in each ear. Your brain processes these signals and genuinely believes you are standing in a completely different world!</div>`",
        "title: `📜 Historical Discovery: The Sensorama`,\n                            content: `<div style=\"line-height:1.7;\">In 1962, Morton Heilig built the first VR machine!</div><div class=\"journal-box\" style=\"border-left-color:#667eea; background:rgba(102,126,234,0.1);\">Called the Sensorama, it was a mechanical cabinet you stuck your head into. It played 3D film, blew wind on your face, vibrated your seat, and even released smells to create a fully immersive wave experience!</div>`"
    )
]

def update_files():
    files = glob.glob('gen_*.py')
    for f in files:
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
            
        modified = False
        for old, new in replacements:
            if old in content:
                content = content.replace(old, new)
                modified = True
                
        # Also let's inject the debug button
        # find: <div class="energy-controls"><button class="btn-drop" onclick="xxx"> or <button class="btn-pause" ...
        # replace with: <div class="energy-controls"><button class="btn-debug" onclick="initSim('\\1')">🛠️ Debug</button><button...
        # Wait, the init function needs an ID. 
        # Actually it's simpler:
        import re
        content, n = re.subn(r'(<div id=\"threejs-container-(l\d+)\".*?<div class=\"energy-controls\">)', r'\1<button class="btn-debug" onclick="initSim(\'\2\')">🛠️ Debug</button>', content, flags=re.DOTALL)
        if n > 0:
            modified = True
            
        if modified:
            with open(f, 'w', encoding='utf-8') as file:
                file.write(content)
                
    print("Files updated!")

if __name__ == "__main__":
    update_files()
