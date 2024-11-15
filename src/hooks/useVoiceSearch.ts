import { useState } from "react";

type UseVoiceSearchProps = {
  lang?: string;
  onResult: (transcript: string) => void;
  onError?: (error: string) => void;
};

export const useVoiceSearch = ({
  lang = "pt-BR",
  onResult,
  onError,
}: UseVoiceSearchProps) => {
  const [isListening, setIsListening] = useState(false);

  const handleVoiceSearch = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Seu navegador não suporta reconhecimento de voz");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = lang;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let transcript = event.results[0][0].transcript;
      transcript = transcript.replace(/\.$/, "");
      onResult(transcript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Erro no reconhecimento de voz:", event.error);
      onError?.(event.error);
    };

    recognition.start();
  };

  return { handleVoiceSearch, isListening };
};
