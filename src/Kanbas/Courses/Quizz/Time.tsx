import { useEffect, useState } from "react";

export default function Time({ elapsedS }: { elapsedS: number }) {

  const hours = Math.floor(elapsedS / 3600);
  const minutes = Math.floor((elapsedS / 60) % 60);
  const seconds = elapsedS % 60;

  const padTime = (t: number) => {
    return t >= 10 ? `${t}` : `0${t}`
  }
  return (
    <div>
      elapsed time from start:{" "}
      {hours > 0 ? `${hours}:` : ""}
      {padTime(minutes)}:
      {padTime(seconds)}
    </div>
  );
}