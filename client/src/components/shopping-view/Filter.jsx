import { filterOptions } from "@/store/auth-slice";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

const Filter = () => {
  return (
    <div className='w-64 h-full bg-white shadow-lg border-r border-gray-200'>
      <h2 className='text-xl font-bold border-b p-4'>Filters</h2>

      <div className='mt-4'>
        <h3 className='text-md font-bold text-black ml-4'>Category</h3>
        <div className='p-4 space-y-2'>
          {filterOptions?.category.map((keyItem) => (
            <Label key={keyItem.id} className="flex ml-4 gap-2">
              <Checkbox className="border border-blue-400" />
              <span className='text-base text-black'>{keyItem.label}</span>
            </Label>
          ))}
        </div>

        <h3 className='text-md font-bold text-black ml-4 mt-2'>Brand</h3>
        <div className='p-4 space-y-2'>
          {filterOptions?.brand?.map((item) => (
            <Label key={item.id} className="flex ml-4 gap-2">
              <Checkbox className="border border-blue-400" />
              <span className='text-base text-black'>{item.label}</span>
            </Label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter