from gtts import gTTS
from deep_translator import GoogleTranslator
import pygame

# List of supported Indian languages (limited to those supported by gTTS)
languages = {
    "Bengali": "bn",
    "Gujarati": "gu",
    "Hindi": "hi",
    "Kannada": "kn",
    "Malayalam": "ml",
    "Marathi": "mr",
    "Punjabi": "pa",
    "Tamil": "ta",
    "Telugu": "te",
    "Urdu": "ur",
    "English": "en",
}


def display_languages():
    print("Available target languages for speech:")
    for lang_name, lang_code in languages.items():
        print(f"{lang_name}: {lang_code}")


def get_language():
    selected_language = input("Enter the language code for speech output: ")
    if selected_language not in languages.values():
        print(
            f"Invalid selection. Please run the program again and choose a valid language code."
        )
        return None
    return selected_language


def translate_and_speak(selected_language, my_text=None):
    if not my_text:
        my_text = input("Enter the text to be translated and converted to speech: ")
    try:
        translated_text = GoogleTranslator(target=selected_language).translate(my_text)
        print(f"Translated Text: {translated_text}")

        tts = gTTS(text=translated_text, lang=selected_language, slow=False)
        file_name = "output.mp3"
        tts.save(file_name)

        pygame.mixer.init()
        pygame.mixer.music.load(file_name)
        pygame.mixer.music.play()

        while pygame.mixer.music.get_busy():
            pygame.time.Clock().tick(10)

        pygame.mixer.quit()
        return my_text
    except Exception as e:
        print(f"Error during translation or speech synthesis: {e}")
        return None


def main():
    display_languages()
    selected_language = get_language()
    if selected_language:
        my_text = None
        while True:
            my_text = input("Enter the text to be translated and converted to speech: ")
            translate_and_speak(selected_language, my_text)
            next_action = (
                input(
                    "Type 'repeat' to repeat the same speech \n"
                    "'change' to change language \n"
                    "or \n"
                    "'exit' to quit: "
                )
                .strip()
                .lower()
            )
            if next_action == "repeat":
                continue
            elif next_action == "change":
                display_languages()
                selected_language = get_language()
                if not selected_language:
                    break
                my_text = None
            elif next_action == "exit":
                break
            else:
                print("Invalid option. Please try again.")


if __name__ == "__main__":
    main()
