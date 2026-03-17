import re

def get_bundle4_vocab():
    return """
            bundle4: [
                { word: "Wave", definition: "A disturbance that transfers energy from one place to another." },
                { word: "Matter", definition: "Any physical substance; the 'stuff' that the wave travels through." },
                { word: "Energy Transfer", definition: "The passing of energy from one object, molecule, or place to another." },
                { word: "Peak (or Crest)", definition: "The highest point of a wave." },
                { word: "Trough", definition: "The lowest point of a wave." },
                { word: "Amplitude", definition: "The height of a wave from its resting position to its peak." },
                { word: "Wavelength", definition: "The distance between one peak and the next peak." },
                { word: "Vibration", definition: "A rapid back-and-forth movement." },
                { word: "Sound Wave", definition: "A pattern of disturbance caused by the movement of energy traveling through a medium." },
                { word: "Medium", definition: "The matter (solid, liquid, or gas) through which a wave travels." },
                { word: "Vacuum", definition: "A space that is completely empty of bounds—no air, no gas, nothing." },
                { word: "Light Wave", definition: "A type of wave that travels in straight lines and carries electromagnetic energy." },
                { word: "Electromagnetic Spectrum", definition: "The entire range of light waves, including things we can't see like X-rays and radio waves." },
                { word: "Speed of Light", definition: "The fastest speed in the universe: 186,282 miles per second!" },
                { word: "Reflection", definition: "When light hits a surface and bounces off back into our eyes." },
                { word: "Refraction", definition: "When light passes through a new medium (like water or glass) and changes speed, causing it to bend." },
                { word: "Opaque", definition: "Materials that block all light (wood, metal)." },
                { word: "Transparent", definition: "Materials that let light pass through perfectly (clear glass)." },
                { word: "Information Transfer", definition: "The process of moving data or a message from one person or place to another." },
                { word: "Code", definition: "A system of rules to convert information (like a letter or word) into another form (like a beep or a flash)." },
                { word: "Pattern", definition: "A repeated, predictable design or sequence." },
                { word: "Morse Code", definition: "A method of sending text information as a series of on-off tones, clicks, or lights." },
                { word: "Dot (or Dit)", definition: "A very short signal in Morse Code (1 unit of time)." },
                { word: "Dash (or Dah)", definition: "A long signal in Morse Code (3 units of time)." },
                { word: "Telegraph", definition: "An old machine used to transmit and receive Morse code messages over long electrical wires." },
                { word: "Binary Code", definition: "A coding system using the binary digits 0 and 1 to represent a letter, digit, or other character in a computer." },
                { word: "Bit", definition: "The smallest unit of data in a computer (a single 0 or 1)." },
                { word: "Digital Signal", definition: "A signal that is expressed as a series of the digits 0 and 1." },
                { word: "Analog Signal", definition: "A continuous signal that has infinite possibilities (like a smooth wave)." },
                { word: "Lens", definition: "A curved piece of glass or plastic that refracts (bends) light to a specific focal point." },
                { word: "Retina / Image Sensor", definition: "The surface that catches the light image (in your eye, or in a digital camera)." },
                { word: "Digitize", definition: "The process of converting a physical wave (like light or sound) into a digital computer file of 1s and 0s." },
                { word: "Technology Evolution", definition: "The process of improving tools and systems over time to solve problems more effectively." },
                { word: "Reliability", definition: "How consistently a system works without failing or losing the message." },
                { word: "Global Network", definition: "A system of computers, cables, and satellites connecting the entire planet." }
            ]
"""

def inject():
    with open('vocabulary-cards.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # Find where bundle4: [ starts and the matching end ]
    start_idx = html.find('bundle4: [')
    if start_idx == -1:
        print("bundle4 not found")
        return

    # find the next closing bracket that aligns with the array
    # this might be tricky, but we know it's a list of objects.
    # Let's search for the end of the vocabularyData object `};` or just `]` at that indentation.
    match = re.search(r'bundle4:\s*\[.*?\]', html, re.DOTALL)
    if match:
        new_html = html[:match.start()] + get_bundle4_vocab().strip() + html[match.end():]
        with open('vocabulary-cards.html', 'w', encoding='utf-8') as f:
            f.write(new_html)
        print("Successfully replaced Bundle 4 vocabulary.")
    else:
        print("Could not match array.")

if __name__ == "__main__":
    inject()
