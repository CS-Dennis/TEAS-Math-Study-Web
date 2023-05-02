import React, { useEffect, useState } from 'react';
import { getRandomNum } from '../Utils/util';
import FractionDecimalConversion from './FractionDecimalConversion';
import DecimalFractionConversion from './DecimalFractionConversion';
import FractionPercentageConversion from './FractionPercentageConversion';
import PercentageFractionConversion from './PercentageFractionConversion';
import DecimalPercentageConversion from './DecimalPercentageConversion';
import PercentageDecimalConversion from './PercentageDecimalConversion';
import AdditionOfDecimal from './AdditionOfDecimal';
import SubtractionOfDecimal from './SubtractionOfDecimal';
import MultiplicationOfDecimal from './MultiplicationOfDecimal';
import DivisionOfDecimal from './DivisionOfDecimal';

export default function PracticeQuestionSectionAdapter({ type }) {
  // eslint-disable-next-line no-unused-vars
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
      {questionType === 4 && (
        <AdditionOfDecimal questionTypeChange={() => questionTypeChange()} />
      )}
      {questionType === 5 && (
        <SubtractionOfDecimal questionTypeChange={() => questionTypeChange()} />
      )}
      {questionType === 6 && (
        <MultiplicationOfDecimal
          questionTypeChange={() => questionTypeChange()}
        />
      )}
      {questionType === 7 && (
        <DivisionOfDecimal questionTypeChange={() => questionTypeChange()} />
      )}
    </>
  );
}
