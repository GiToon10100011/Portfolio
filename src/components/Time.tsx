import React, { useEffect, useState } from "react";
import styled from "styled-components";

const CurrentTime = styled.p`
  font-size: 24px;
  display: flex;
  align-items: flex-end;
  span {
    font-size: 10px;
  }
  @media (max-width: 768px) {
    font-size: 20px;
    span {
      font-size: 8px;
    }
  }
`;

const Time = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const [time, period] = currentTime
    .toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .split(" ");

  const [firstPeriod, secondPeriod] = period.split("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <CurrentTime>
      {time}
      <span>
        {firstPeriod}.{secondPeriod}.
      </span>
    </CurrentTime>
  );
};

export default React.memo(Time);
