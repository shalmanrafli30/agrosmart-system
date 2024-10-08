import React from 'react'

const indikatorKelembapan = ({ humid }: { humid: number }) => {
    const bgColor = 
        humid > 30 || humid < 20 ? 'bg-warning' : 
        'bg-primary';

    const bgIcon =
        humid > 30 || humid < 20 ? 'text-warningSecondary' : 
        'text-secondary';

    return (
        <div>indikatorKelembapan</div>
    )
}

export default indikatorKelembapan