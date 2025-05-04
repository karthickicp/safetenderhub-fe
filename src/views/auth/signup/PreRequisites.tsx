import React, { Fragment, useState } from "react";

export const PreRequisites = ({
  handleNextStep,
}: {
  handleNextStep: (step: number) => void;
}) => {
  const [userType, setUserType] = useState("");

  const handleUserTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserType(e.target.value);
  };

  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    aadhaar: false,
    mobile: false,
    email: false,
  });

  const isSubmitEnabled = Object.values(checkedItems).every((item) => item);
  return (
    <Fragment>
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Pre-requisites</h3>
        <p className="text-sm text-gray-600 mb-4">
          Please select your Role in the Buyer Organisation
        </p>

        <div className="mb-4">
          <label htmlFor="userType" className="input-label">
            User Type <span className="text-red-500">*</span>
          </label>
          <select
            id="userType"
            className="input-field"
            value={userType}
            onChange={handleUserTypeChange}
          >
            <option value="" className="hidden">
              Select type of User
            </option>
            <option value="HOD">Primary User (HOD)</option>
            <option value="VA">Verifying Authority (VA)</option>
            <option value="Cooperative">Primary User (Co-operative)</option>
          </select>

          {userType === "HOD" ? (
            <>
              <div className="mt-4">
                <h4 className="font-semibold text-gray-600 mb-2">
                  For User registration - you require the following before you
                  can proceed
                </h4>
                <fieldset>
                  <div className="mb-2">
                    <input
                      type="checkbox"
                      id="aadhaar"
                      className="checkbox me-3 pointer"
                      checked={checkedItems.aadhaar}
                      onChange={(e) =>
                        setCheckedItems({
                          ...checkedItems,
                          aadhaar: e.target.checked,
                        })
                      }
                    />
                    <label htmlFor="aadhaar">Aadhaar</label>
                  </div>
                  <div className="mb-2">
                    <input
                      type="checkbox"
                      id="active-mobile"
                      className="checkbox me-3 pointer"
                      checked={checkedItems.mobile}
                      onChange={(e) =>
                        setCheckedItems({
                          ...checkedItems,
                          mobile: e.target.checked,
                        })
                      }
                    />
                    <label htmlFor="active-mobile">Active Mobile Number</label>
                  </div>
                  <div className="mb-2">
                    <input
                      type="checkbox"
                      id="govt-email"
                      className="checkbox me-3 pointer"
                      checked={checkedItems.email}
                      onChange={(e) =>
                        setCheckedItems({
                          ...checkedItems,
                          email: e.target.checked,
                        })
                      }
                    />
                    <label htmlFor="govt-email">Government email id</label>
                  </div>
                </fieldset>
              </div>
              <div className="w-full max-w-4xl mx-auto bg-white rounded shadow p-6 space-y-6">
                {/* Alert Banner */}
                <div className="bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800 p-4 text-sm">
                  If you do not have Government Email ID,{" "}
                  <a href="#" className="text-blue-600 underline font-medium">
                    Click Here
                  </a>{" "}
                  to apply for @gembuyer.in Email ID.
                </div>

                {/* User Manual Link */}
                <div>
                  <a
                    href="#"
                    className="text-orange-600 font-bold text-sm underline"
                  >
                    PRIMARY USER (HOD) USER MANUAL
                  </a>
                </div>

                {/* Instruction Message */}
                <div>
                  <p className="font-medium text-gray-800 text-sm">
                    If you want to register as the buyers/ users involved in
                    procurement process please contact Primary user (HOD) of
                    your organisation
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Note:- Only non buying roles i.e. Primary User (HOD)/
                    Verifying Authority can get registered from here.
                  </p>
                </div>

                {/* Proceed Button (Disabled) */}
                <div>
                  <button
                    className={`btn ${isSubmitEnabled ? "" : "btn-disabled"}`}
                    disabled={!isSubmitEnabled}
                    onClick={() => handleNextStep(1)}
                  >
                    PROCEED
                  </button>
                </div>
              </div>
            </>
          ) : null}
        </div>

        {userType !== "HOD" ? (
          <>
            <p className="text-sm text-gray-500 mb-6">
              To complete the registration process please contact Primary user
              (HOD) of your organisation
            </p>

            <button
              className="bg-gray-300 text-white px-4 py-2 rounded cursor-not-allowed"
              disabled
            >
              PROCEED
            </button>
          </>
        ) : null}
      </div>

      <div className="mt-6 text-sm text-gray-700">
        Already registered with GeM?{" "}
        <a href="#" className="text-blue-600 font-semibold  hover:underline">
          CLICK HERE TO LOGIN
        </a>
      </div>
    </Fragment>
  );
};
