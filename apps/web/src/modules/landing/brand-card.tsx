interface BrandCardProps {
  id: number;
  name: string;
  logo: string;
  website: string;
}

export function BrandCard({ props }: { props: BrandCardProps }) {
  return (
    <div className="aspect-[16/7] w-[340px] md:w-[400px] rounded-2xl flex flex-col justify-between shadow-lg bg-gradient-to-br from-white via-slate-50 to-slate-100 border border-slate-200 hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <a
        href={props.website}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center group min-h-44"
      >
        <img
          src={props.logo}
          alt={props.name}
          className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105 p-6"
          style={{ maxHeight: "140px" }}
        />
      </a>
      <div className="p-4 flex items-center justify-center">
        <p className="font-bold text-lg text-slate-800 text-center truncate w-full">{props.name}</p>
      </div>
    </div>
  );
}
