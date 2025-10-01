"use client";

import React, { useState, useEffect, memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle, Calendar, CalendarX, Check } from "lucide-react";
import { format } from "date-fns";

import { poll, ViewMode } from "./ts-types";
import { useApolloClient } from "@apollo/client/react";
import { getPollByIdForUser, voteOnPoll } from "@/components/grapqhl/action/polls";


type PollOption = {
  id: string;
  text: string;
  votes: number;
};

export default function Polls({ id }: { id: string }) {
  const { data, loading, error } = getPollByIdForUser({
    variables: { input: { pollId: id } },
    skip: !id,
    
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="animate-spin">⏳</span>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="text-destructive">Failed to load poll.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col">

      <ScrollArea className="h-full px-3 pt-2">
        <PollVote data={data?.getPollByIdForUser} />
      </ScrollArea>
    </div>
  );
}

const PollVote = memo(({ data }: { data: poll }) => (
  <PollComponent
    mode={data?.resultVisibility}
    options={data?.options}
    title={data?.title}
    description={data?.question}
    id={data?.id}
    isVoted={data?.isVoted}
    votedOptionId={data?.votedOptionId}
    totalVotes={data?.totalVotes}
    endDate={data?.endDate}
  />
));

function PollComponent({
  mode,
  options = [],
  title,
  description,
  id,
  isVoted,
  votedOptionId,
  totalVotes = 0,
  endDate,
}: {
  mode?: ViewMode;
  options?: PollOption[];
  title?: string;
  description?: string;
  id?: string;
  isVoted?: boolean;
  votedOptionId?: string;
  totalVotes?: number;
  endDate?: string;
}) {
  const [vote] = voteOnPoll({});
  const client = useApolloClient();

  const [selectedOption, setSelectedOption] = useState<string>(votedOptionId ?? "");
  const [hasVoted, setHasVoted] = useState(!!isVoted);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voteError, setVoteError] = useState<string | null>(null);

  useEffect(() => {
    setHasVoted(!!isVoted);
    setSelectedOption(votedOptionId ?? "");
  }, [isVoted, votedOptionId]);

  const now = new Date();
  const pollEndDate = endDate ? new Date(endDate) : null;
  const isPollClosed = pollEndDate ? now > pollEndDate : false;

  const handleVote = async () => {
    if (!selectedOption || hasVoted || isSubmitting || isPollClosed) return;
    setIsSubmitting(true);
    setVoteError(null);

    try {
      const pollData = client.readQuery<{ getPollByIdForUser: poll }>({
        query: GET_POLL_BY_USER,
        variables: { input: { pollId: id } },
      })?.getPollByIdForUser;

      if (!pollData) throw new Error("Poll data not found");

      const updatedOptions = pollData.options.map((opt) =>
        opt.id === selectedOption ? { ...opt, votes: opt.votes + 1 } : opt
      );

      client.writeQuery({
        query: GET_POLL_BY_USER,
        variables: { input: { pollId: id } },
        data: {
          getPollByIdForUser: {
            ...pollData,
            options: updatedOptions,
            isVoted: true,
            votedOptionId: selectedOption,
            totalVotes: pollData.totalVotes + 1,
          },
        },
      });

      await vote({
        variables: {
          input: {
            pollId: id,
            optionId: selectedOption,
          },
        },
      });

      setHasVoted(true);
    } catch (err: any) {
      setVoteError("Failed to submit vote. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const shouldShowResults = () => {
    switch (mode) {
      case "ALWAYS":
        return true;
      case "AFTER_VOTE":
        return hasVoted;
      case "AFTER_END":
        return false;
      default:
        return false;
    }
  };

  const handleOptionSelect = (optionId: string) => {
    if (hasVoted) return;
    setSelectedOption(optionId);
  };

  return (
    <Card className="mb-2">
      <CardContent className="p-4">
        {pollEndDate && !isPollClosed && (
          <div className="flex items-center bg-green-50 p-2 rounded mb-3">
            <Calendar className="w-4 h-4 text-green-600" />
            <span className="ml-2 text-green-700 text-sm font-medium">
              <b>Last day of voting:</b> {format(pollEndDate, "PPPp")}
            </span>
          </div>
        )}
        {isPollClosed && (
          <div className="flex items-center bg-red-50 p-2 rounded mb-3">
            <CalendarX className="w-4 h-4 text-red-700" />
            <span className="ml-2 text-red-700 text-sm font-medium">
              Voting closed on {pollEndDate ? format(pollEndDate, "PPPp") : ""}
            </span>
          </div>
        )}
        <div className="font-semibold mb-2 text-base">{title}</div>
        <div className="mb-2 text-sm">{description}</div>
        {isPollClosed && (
          <div className="text-red-700 mb-2 font-semibold text-sm">
            Voting is closed.
          </div>
        )}
        <div className="flex flex-col gap-2 mb-2">
          {options.map((option) => (
            <button
              key={option.id}
              className={`flex flex-col border rounded px-3 py-2 text-left transition
                ${selectedOption === option.id ? "border-primary bg-primary/10" : "border-muted"}
                ${hasVoted || isPollClosed ? "cursor-not-allowed opacity-70" : "hover:border-primary"}
              `}
              onClick={() => handleOptionSelect(option.id)}
              disabled={hasVoted || isPollClosed}
              aria-pressed={selectedOption === option.id}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center justify-center w-5 h-5 rounded border
                      ${selectedOption === option.id ? "bg-primary text-white border-primary" : "border-muted"}
                    `}
                  >
                    {selectedOption === option.id && <Check className="w-3 h-3" />}
                  </span>
                  <span className="text-sm font-medium">{option.text}</span>
                </div>
                {shouldShowResults() && (
                  <span className="text-xs font-semibold text-muted-foreground">{option.votes}</span>
                )}
              </div>
              {shouldShowResults() && (
                <div className="flex items-center gap-2 mt-1">
                  <Progress value={totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0} className="flex-1 h-1" />
                  <span className="text-xs font-semibold text-muted-foreground min-w-[24px] text-right">
                    {totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0}%
                  </span>
                </div>
              )}
            </button>
          ))}
        </div>
        {voteError && (
          <div className="text-destructive text-sm mb-2">{voteError}</div>
        )}
        <div className="flex items-center justify-between">
          {shouldShowResults() && (
            <span className="text-xs text-muted-foreground">{totalVotes} votes</span>
          )}
          <div className="flex items-center gap-2">
            {!hasVoted && !isPollClosed && (
              <Button
                onClick={handleVote}
                disabled={!selectedOption || isSubmitting || isPollClosed}
                loading={isSubmitting}
              >
                Vote
              </Button>
            )}
            {hasVoted && (
              <span className="flex items-center text-primary text-xs font-medium">
                <CheckCircle className="w-4 h-4 mr-1" />
                {mode === "ADMIN"
                  ? "Your vote has been recorded anonymously"
                  : "Vote recorded"}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
