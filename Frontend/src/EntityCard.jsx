import React from 'react';

const EntityCard = ({ entity }) => {
  return (
    <div className="flex w-[40vw] h-48 gap-10 justify-evenly items-center border border-green-500">
      <div className="text-left flex-col justify-start">
        <h3 className="font-bold text-lg">{entity.Name}</h3>
        <p className="font-semibold text-lg">{entity.Work}</p>
        <p className="font-semibold text-lg">{entity.PhoneNumber} </p>
        <p className="font-semibold text-lg">{entity.Email}</p>
        <p className="font-semibold text-lg">{entity.WorkExp}</p>
        <p className="font-semibold text-lg">{entity.Location}</p>
        <p className="font-semibold text-lg">{entity.ExpectedSalary}</p>
        <img
          src={entity.Profile}
          className="border rounded-full border-black size-28 flex-col items-center"
        />
      </div>
    </div>
  );
};

export default EntityCard;
