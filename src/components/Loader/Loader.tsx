export default function Loader({ customClass }: { customClass?: string }) {
  return (
    <div className="flex flex-row space-x-4">
      <div
        className={`rounded-full animate-spin border border-dashed border-cyan-500 border-t-transparent ${customClass} `}
      ></div>
    </div>
  );
}
