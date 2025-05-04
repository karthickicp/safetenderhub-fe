export const TermsAndConditions = ({
  handleNextStep,
}: {
  handleNextStep: (step) => void;
}) => {
  return (
    <>
      <h1 className="text-xl font-semibold mb-4">TermsAndConditions</h1>
      <button className="btn" onClick={() => handleNextStep(2)}>
        Proceed
      </button>
    </>
  );
};
