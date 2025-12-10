import { useEffect, useState, type FC } from "react";
import { formatCurrency } from "../../utils/util";

type Props = {
  handleSetRangePrice: (value: number[]) => void;
};

const InputRangePrice: FC<Props> = ({ handleSetRangePrice }) => {
  // state value
  const [rangeValue, setRangeValue] = useState<number[]>([0, 0]);

  //
  useEffect(() => {
    // set setelah 2 detik
    const timer = setTimeout(() => {
      handleSetRangePrice(rangeValue);
    }, 1000);

    return () => clearTimeout(timer);
  }, [rangeValue]);

  return (
    <div className="w-full flex flex-col justify-start items-start gap-2 mt-6 border-b border-black/20 pb-8">
      {/* title */}
      <p className="text-base text-black/60">Price (for 1 night)</p>

      <div className="w-full flex flex-row justify-start items-start gap-1">
        {/* range awal */}
        <p className="flex-1 text-sm text-black font-semibold text-center">
          {formatCurrency(rangeValue[0])}
        </p>
        <p className="flex-1 text-sm text-black font-semibold text-center">-</p>
        <p className="flex-1 text-sm text-black font-semibold text-center">
          {formatCurrency(rangeValue[1])}
        </p>
      </div>

      {/* input range */}
      <div className="w-full flex flex-row justify-start items-center gap-2">
        {/* range 1 */}
        <input
          type="range"
          min={0}
          max={2000}
          step={10}
          value={rangeValue[0]}
          onChange={(e) => setRangeValue([+e.target.value, rangeValue[1]])}
          className="flex-1 appearance-none"
        />

        <input
          type="range"
          min={0}
          max={2000}
          step={10}
          value={rangeValue[1]}
          onChange={(e) => setRangeValue([rangeValue[0], +e.target.value])}
          className="flex-1 appearance-none"
        />
      </div>
    </div>
  );
};

export default InputRangePrice;
