import React from 'react'
import Temp from "../assets/suhu.svg";

const indikatorSuhu = ({suhu}: {suhu:number}) => {
    return (
        <div className="bg-primary w-full h-auto p-4 text-white rounded-xl">
            <h5 className="mb-3">Suhu</h5>
            <span className="font-bold text-4xl">{suhu} °C</span>
            <Temp className="text-purple-500"/>
        </div>
    )
}

export default indikatorSuhu