export function DashboardSkeleton() {
  return <div></div>;
}

const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-slate-700 before:to-transparent";

export function SendNewsletterSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div
        className={`${shimmer} relative overflow-hidden h-12 w-52 bg-slate-900 mb-5 rounded-md`}
      ></div>
      <div
        className={`${shimmer} relative overflow-hidden h-10 w-full bg-slate-900 rounded-md`}
      ></div>
      <div
        className={`${shimmer} relative overflow-hidden w-32 h-10 bg-slate-900 rounded-md`}
      ></div>
      <div className="flex justify-between">
        <div className="flex gap-1">
          <div
            className={`${shimmer} relative overflow-hidden w-32 h-10 bg-slate-900 rounded-md`}
          ></div>
          <div
            className={`${shimmer} relative overflow-hidden w-32 h-10 bg-slate-900 rounded-md`}
          ></div>
          <div
            className={`${shimmer} relative overflow-hidden w-32 h-10 bg-slate-900 rounded-md`}
          ></div>
        </div>
        <div
          className={`${shimmer} relative overflow-hidden w-40 h-10 bg-slate-900 rounded-md`}
        ></div>
      </div>
      <div className="flex flex-col gap-1">
        <div
          className={`${shimmer} relative overflow-hidden h-10 bg-slate-900 rounded-md`}
        ></div>
        <div
          className={`${shimmer} relative overflow-hidden h-[350px] bg-slate-900 rounded-md`}
        ></div>
      </div>
      <div
        className={`${shimmer} relative overflow-hidden h-12 w-40 bg-slate-900 rounded-md`}
      ></div>
      <div className="flex flex-row gap-2">
        <div
          className={`${shimmer} relative overflow-hidden w-32 h-10 bg-slate-900 rounded-md`}
        ></div>
        <div
          className={`${shimmer} relative overflow-hidden w-32 h-10 bg-slate-900 rounded-md`}
        ></div>
      </div>
      <div className="flex flex-row gap-2 h-[600px]">
        <div
          className={`${shimmer} relative overflow-hidden w-1/2 h-full bg-slate-900 rounded-md`}
        ></div>
        <div
          className={`${shimmer} relative overflow-hidden w-1/2 h-full bg-slate-900 rounded-md`}
        ></div>
      </div>
    </div>
  );
}

export function TemplatesSkeleton() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-5">
      <div className="flex flex-col gap-2">
        <div
          className={`${shimmer} relative overflow-hidden  h-10 bg-slate-900`}
        ></div>
        <div
          className={`${shimmer} overflow-hidden relative rounded-sm w-[300px] h-[400px] bg-slate-900`}
        ></div>
      </div>
      <div className="flex flex-col gap-2">
        <div
          className={`${shimmer} relative overflow-hidden  h-10 bg-slate-900`}
        ></div>
        <div
          className={`${shimmer} overflow-hidden relative rounded-sm w-[300px] h-[400px] bg-slate-900`}
        ></div>
      </div>
      <div className="flex flex-col gap-2">
        <div
          className={`${shimmer} relative overflow-hidden  h-10 bg-slate-900`}
        ></div>
        <div
          className={`${shimmer} overflow-hidden relative rounded-sm w-[300px] h-[400px] bg-slate-900`}
        ></div>
      </div>
      <div className="flex flex-col gap-2">
        <div
          className={`${shimmer} relative overflow-hidden  h-10 bg-slate-900`}
        ></div>
        <div
          className={`${shimmer} overflow-hidden relative rounded-sm w-[300px] h-[400px] bg-slate-900`}
        ></div>
      </div>
      <div className="flex flex-col gap-2">
        <div
          className={`${shimmer} relative overflow-hidden  h-10 bg-slate-900`}
        ></div>
        <div
          className={`${shimmer} overflow-hidden relative rounded-sm w-[300px] h-[400px] bg-slate-900`}
        ></div>
      </div>
      <div className="flex flex-col gap-2">
        <div
          className={`${shimmer} relative overflow-hidden  h-10 bg-slate-900`}
        ></div>
        <div
          className={`${shimmer} overflow-hidden relative rounded-sm w-[300px] h-[400px] bg-slate-900`}
        ></div>
      </div>
    </div>
  );
}

export function EditTemplateSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row gap-3 mb-5">
        <div
          className={`${shimmer} relative overflow-hidden h-12 w-52 bg-slate-900 mb-5 rounded-md`}
        ></div>
        <div
          className={`${shimmer} relative overflow-hidden h-12 w-32 bg-slate-900 mb-5 rounded-md`}
        ></div>
      </div>
      <div className="flex flex-row justify-between">
        <div
          className={`${shimmer} relative overflow-hidden h-10 w-52 bg-slate-900  rounded-md`}
        ></div>
        <div
          className={`${shimmer} relative overflow-hidden h-10 w-52 bg-slate-900  rounded-md`}
        ></div>
        <div
          className={`${shimmer} relative overflow-hidden h-10 w-52 bg-slate-900  rounded-md`}
        ></div>
      </div>
      <div className="flex flex-row gap-2 h-screen">
        <div
          className={`${shimmer} relative overflow-hidden h-full w-1/2 bg-slate-900  rounded-md`}
        ></div>
        <div
          className={`${shimmer} relative overflow-hidden h-full w-1/2 bg-slate-900  rounded-md`}
        ></div>
      </div>
    </div>
  );
}
