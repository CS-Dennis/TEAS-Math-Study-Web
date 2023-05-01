import React, { useEffect, useState } from 'react';
import { getRandomNum } from '../Utils/util';
import FractionDecimalConversion from './FractionDecimalConversion';
import DecimalFractionConversion from './DecimalFractionConversion';
import FractionPercentageConversion from './FractionPercentageConversion';
import PercentageFractionConversion from './PercentageFractionConversion';

export default function PracticeQuestionSectionAdapter({ type }) {
  const [questionType, setQuestionType] = useState(type);

  // this is used for vice versa questions (e.g., Fraction to Decimal (vice versa))
  const [questionSubType, setQuestionSubType] = useState(null);

  const questionTypeChange = () => {
    // Fraction to Decimal (vice versa)
    if (type === 1 || type === 2) {
      const randomSubType = getRandomNum(1, 2);
      setQuestionSubType(randomSubType);
      console.log(randomSubType);
    }
  };

  useEffect(() => {
    questionTypeChange();

    // for test purpose
    setQuestionSubType(2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {questionType === 1 && (
        <>
          {questionSubType === 1 && (
            <FractionDecimalConversion
              questionTypeChange={() => questionTypeChange()}
            />
          )}
          {questionSubType === 2 && (
            <DecimalFractionConversion
              questionTypeChange={() => questionTypeChange()}
            />
          )}
        </>
      )}
      {questionType === 2 && (
        <>
          {questionSubType === 1 && (
            <FractionPercentageConversion
              questionTypeChange={() => questionTypeChange()}
            />
          )}
          {questionSubType === 2 && (
            <PercentageFractionConversion
              questionTypeChange={() => questionTypeChange()}
            />
          )}
        </>
      )}
    </>
  );
}
