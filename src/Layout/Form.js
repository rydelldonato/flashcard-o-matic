import React from "react";

export default function Form({
  formTitle,
  HandleSubmit,
  HandleDoneButton,
  handleFormChange,
  formPlaceholderOne,
  formPlaceholderTwo,
  formValueOne,
  formValueTwo,
  buttonName
}) {
  return (
    <div>
      <h3>{formTitle}</h3>
      <form onSubmit={HandleSubmit}>
        <div>
          <label htmlFor="front">Front</label>
        </div>
        <div>
          <textarea
            onChange={handleFormChange}
            id="front"
            name="front"
            type="text"
            placeholder={formPlaceholderOne}
            defaultValue={formValueOne ? formValueOne : ""}
          ></textarea>
        </div>
        <div>
          <label htmlFor="back">Back</label>
        </div>
        <div>
          <textarea
            onChange={handleFormChange}
            id="back"
            name="back"
            type="text"
            placeholder={formPlaceholderTwo}
            defaultValue={formValueTwo ? formValueTwo : ""}
          ></textarea>
        </div>
        <div className="mt-2">
          <button onClick={HandleDoneButton} className="btn btn-secondary mr-2">
            {buttonName}
          </button>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
