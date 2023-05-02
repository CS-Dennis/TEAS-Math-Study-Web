import React, { useEffect, useState } from 'react';
import { getRandomNum } from '../Utils/util';
import FractionDecimalConversion from './FractionDecimalConversion';
import DecimalFractionConversion from './DecimalFractionConversion';
import FractionPercentageConversion from './FractionPercentageConversion';
import PercentageFractionConversion from './PercentageFractionConversion';
import DecimalPercentageConversion from './DecimalPercentageConversion';
import PercentageDecimalConversion from './PercentageDecimalConversion';

export default function PracticeQuestionSectionAdapter({ type }) {
  const [questionType, setQuestionType] = useState(type);

  // this is used for vice versa questions (e.g., Fraction to Decimal (vice versa))
  const [questionSubType, setQuestionSubType] = useState(null);

  const questionTypeChange = () => {
    // Fraction to Decimal (vice versa)
    if (type === 1 || type === 2 || type === 3) {
      const randomSubType = getRandomNum(1, 2);
      setQuestionSubType(randomSubType);
      // setQuestionSubType(2);
      console.log(randomSubType);
    }
  };

  useEffect(() => {
    questionTypeChange();
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
      {questionType === 3 && (
        <>
          {questionSubType === 1 && (
            <DecimalPercentageConversion
              questionTypeChange={() => questionTypeChange()}
            />
          )}
          {questionSubType === 2 && (
            <PercentageDecimalConversion
              questionTypeChange={() => questionTypeChange()}
            />
          )}
        </>
      )}
    </>
  );
}