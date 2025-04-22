import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function MadameSpillApp() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [thinkingStage, setThinkingStage] = useState(0);

  const thinkingMessages = [
    "🌀 Madame Spill σκέφτεται...",
    "☕ Βάλε έναν καφέ...",
    "...ίσως και δεύτερο.",
  ];

  const handleAsk = async () => {
    setLoading(true);
    setAnswer(null);
    setThinkingStage(0);

    const thinkingInterval = setInterval(() => {
      setThinkingStage((prev) => {
        if (prev < thinkingMessages.length - 1) return prev + 1;
        clearInterval(thinkingInterval);
        return prev;
      });
    }, 1500);

    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      let output = data.answer;
      output = output
        .replace(/\bαγαπητή μου\b/gi, "αγάπη μου")
        .replace(/\bαγαπητέ μου\b/gi, "αγάπη μου")
        .replace(/\bφίλη μου\b/gi, "καρδιά μου")
        .replace(/\bφίλε μου\b/gi, "καρδιά μου")
        .replace(/\bαγαπητέ\b/gi, "καλέ")
        .replace(/\bαγαπητή\b/gi, "καλέ")
        .replace(/\bαγαπη\w*/gi, "αγάπη μου");
      setAnswer(output);
    } catch (err) {
      setAnswer("🧿 Κάτι πήγε στραβά. Ξαναρώτα με πριν σε πάρω με τις φλυτζανιές.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 space-y-4">
      <h1 className="text-2xl font-bold">Madame Spill 🧿</h1>
      <Input
        placeholder="Ρώτα τη Madame κάτι που σε καίει..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        disabled={loading}
        onKeyDown={(e) => {
          if (e.key === "Enter" && question.trim()) handleAsk();
        }}
      />
      <Button onClick={handleAsk} disabled={loading || !question}>
        Ρώτα τη Madame
      </Button>
      {loading && (
        <div className="text-muted-foreground italic">
          {thinkingMessages[thinkingStage]}
        </div>
      )}
      {answer && (
        <Card>
          <CardContent className="p-4">
            <p className="whitespace-pre-wrap">{answer}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
