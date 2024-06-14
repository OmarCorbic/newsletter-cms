import Preview from "./preview";

function PresetForm({
  presets,
  customers,
}: {
  presets: any[];
  customers: any[];
}) {
  return (
    <>
      <div className="w-1/3 bg-slate-950 rounded-lg overflow-hidden p-5">
        <form action="">
          <select
            className="w-full py-2 px-3 rounded-sm font-medium text-lg cursor-pointer"
            defaultValue=""
            name="presetId"
          >
            <option value="" disabled>
              Select a preset
            </option>
            {presets?.map((preset) => {
              return (
                <option key={preset.id} value={preset.id}>
                  {preset.name}
                </option>
              );
            })}
          </select>
        </form>
      </div>
      <div className="flex-grow bg-slate-950 rounded-lg overflow-hidden p-5">
        <Preview />
      </div>
    </>
  );
}

export default PresetForm;
