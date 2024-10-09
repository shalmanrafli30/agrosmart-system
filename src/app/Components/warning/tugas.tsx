import React from 'react';

interface TugasProps {
    title: string;
    date: Date;
}

const Tugas: React.FC<TugasProps> = ({ title, date }) => {
    // Format the date to a readable string
    const formattedDate = date.toLocaleDateString('en-GB'); // DD/MM/YYYY format

    // Calculate the number of days left
    const today = new Date();
    const timeDiff = date.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

    return (
        <div className="bg-kuningCerah w-full rounded-md p-4">
            <h3 className="font-bold text-2xl mb-6">{title}</h3>
            <span className="text-base"> Waktu: 
                <span className="text-lg font-bold">
                    {formattedDate} ({daysLeft > 0 ? daysLeft : 0} Hari Lagi)
                </span>
            </span>
        </div>
    );
};

export default Tugas;
