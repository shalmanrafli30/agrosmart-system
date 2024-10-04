export default function Header({ title }: { title: string }) {
    return (
        <div className="shadow-xl p-6 bg-white">
            <span className="text-black font-bold text-xl">{title}</span>
        </div>
    );
}
