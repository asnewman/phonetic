import { atom } from "jotai";

interface Sentence {
  english: string;
  hebrew: string;
  phonetic: string;
}

export const sentencesAtom = atom<Sentence[]>([
  {
    english: "I love apples",
    hebrew: "אני אוהב תפוחים",
    phonetic: "Ani ohev tapuchim",
  },
  {
    english: "I am sorry",
    hebrew: "אני מצטער",
    phonetic: "Ani mitztayer",
  },
]);

export const addSentenceAtom = atom(null, (_get, set, sentence: Sentence) => {
  set(sentencesAtom, (sentences) => [...sentences, sentence]);
});