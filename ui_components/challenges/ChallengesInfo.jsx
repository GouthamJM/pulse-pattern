export default function ChallengesInfo() {
    const data = [
        {
            id: 1,
            value: 21,
            title: "Achieved",
        },
        {
            id: 2,
            value: 3,
            title: "Failed",
        },
        {
            id: 3,
            value: 1000,
            title: "Balance",
        },
    ];
    return (
        <div className="flex items-start justify-between mb-6">
            {data?.map((item) => (
                <div key={item.id}>
                    <p className="paragraph_bold"> {item.value} </p>
                    <p className="paragraph_regular">{item.title}</p>
                </div>
            ))}
        </div>
    );
}
