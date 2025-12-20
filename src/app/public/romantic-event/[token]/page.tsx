"use client";

import { useState, use } from "react";
import { InvitationCard } from "@/modules/public-event/components/InvitationCard";
import {
  StepCard,
  PublicOption,
} from "@/modules/public-event/components/StepCard";
import { AnimatePresence } from "framer-motion";
import {
  useAcceptPublicEvent,
  useGetPublicEvent,
  useRejectPublicEvent,
  useSubmitPublicEventAnswers,
} from "@/modules/public-event/hooks/usePublicEvent";
import { AnswerPayload, PublicStep } from "@/modules/public-event/types";
import { Loader2 } from "lucide-react";

type ViewState = "invitation" | "steps" | "rejected" | "finished";

type Params = Promise<{ token: string }>;
export default function PublicRomanticEventPage({
  params,
}: {
  params: Params;
}) {
  const { token } = use(params);

  const [view, setView] = useState<ViewState>("invitation");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selections, setSelections] = useState<Record<number, number[]>>({});

  const { data: event, isLoading, error } = useGetPublicEvent(token);
  const acceptMutation = useAcceptPublicEvent();
  const rejectMutation = useRejectPublicEvent();
  const submitAnswersMutation = useSubmitPublicEventAnswers();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20">
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
          Error loading event. Please check the link and try again.
        </div>
      </div>
    );
  }

  // Sort steps by order
  const steps = event.steps.sort((a, b) => a.step_order - b.step_order);
  const currentStep = steps[currentStepIndex];

  const handleAccept = () => {
    acceptMutation.mutate(token, {
      onSuccess: () => {
        setView("steps");
        setCurrentStepIndex(0);
      },
    });
  };

  const handleReject = () => {
    rejectMutation.mutate(token, {
      onSuccess: () => {
        setView("rejected");
      },
    });
  };

  const handleNextStep = (selectedOptionIds: number[]) => {
    const newSelections = {
      ...selections,
      [currentStep.id]: selectedOptionIds,
    };
    // Save selection
    setSelections(newSelections);

    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      handleFinish(newSelections);
    }
  };

  const handleFinish = (finalSelections: Record<number, number[]>) => {
    const payload: AnswerPayload = {
      answers: Object.entries(finalSelections).map(([stepId, options]) => ({
        id: Number(stepId),
        options: options,
      })),
    };

    submitAnswersMutation.mutate(
      { token, payload },
      {
        onSuccess: () => {
          console.log("Answers submitted successfully");
          setView("finished");
        },
        onError: (e) => {
          console.error("Error submitting answers", e);
          // Optionally show toast error here
        },
      }
    );
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-background to-secondary/20 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl flex justify-center">
        <AnimatePresence mode="wait">
          {view === "invitation" && (
            <InvitationCard
              key="invitation"
              title={event.title}
              description={event.description}
              date={event.event_date}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          )}

          {view === "rejected" && (
            <div
              key="rejected"
              className="text-center space-y-4 p-8 bg-card border border-border rounded-xl shadow-lg max-w-md"
            >
              <div className="text-4xl">💔</div>
              <h2 className="text-2xl font-bold">Maybe next time...</h2>
              <p className="text-muted-foreground">
                The invitation has been declined.
              </p>
            </div>
          )}

          {view === "steps" && currentStep && (
            <StepCard
              key={`step-${currentStep.id}`}
              title={currentStep.title}
              description={currentStep.description}
              options={currentStep.options}
              onNext={handleNextStep}
              isLastStep={currentStepIndex === steps.length - 1}
            />
          )}

          {view === "finished" && (
            <div
              key="finished"
              className="text-center space-y-4 p-8 bg-card border border-border rounded-xl shadow-lg max-w-md animate-in zoom-in-95 duration-500"
            >
              <div className="text-6xl animate-bounce">🎉</div>
              <h2 className="text-2xl font-bold text-primary">
                It's a Date!
              </h2>
              <p className="text-muted-foreground">
                Your choices have been sent. Can't wait for our special night!
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}