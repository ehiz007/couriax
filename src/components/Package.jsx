import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

export default function Example({ setState, setError }) {
  const [packages, setPackages] = useState([]);

  const [selected, setSelected] = useState({ name: "select package" });

  const handleSelect = (e) => {
    setSelected(e);
    setState((prevState) => ({ ...prevState, package_name: e.name }));
  };

  useEffect(async () => {
    try {
      const response = await fetch(
        "http://couriax-saas-api.eba-huvccy4z.us-east-1.elasticbeanstalk.com/api/v1/package"
      );
      const data = await response.json();
      setPackages(data.data);
    } catch (e) {
      setError("Check your network connection and refresh this page !");
    }
  }, []);

  return (
    <div className="">
      <label htmlFor="first-name" className="text-gray-700 font-medium text-sm">
        Package
      </label>
      <Listbox id="package" value={selected} onChange={handleSelect}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full py-3 pl-4 pr-10 text-left bg-gray-200 text-gray-400 rounded-lg  cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
            <span className="block truncate">{selected.name}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {packages.map((package_name, package_nameIdx) => (
                <Listbox.Option
                  key={package_nameIdx}
                  className={({ active }) =>
                    `cursor-default select-none relative py-2 pl-10 pr-4 ${
                      active ? "text-amber-900 bg-amber-100" : "text-gray-900"
                    }`
                  }
                  value={package_name}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {package_name.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

// <div>
//   <label id="listbox-label" className="text-gray-700 font-medium text-sm">
//     Package
//   </label>
//   <div class="mt-1 relative">
//     <button
//       type="button"
//       className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//       ariaHaspopup="listbox"
//       ariaExpanded="true"
//       ariaLabelledby="listbox-label"
//     >
//       <span className="flex items-center">
//         <span className="ml-3 block truncate"> Select Package </span>
//       </span>
//       <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
//         <svg
//           className="h-5 w-5 text-gray-400"
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 20 20"
//           fill="currentColor"
//           ariaHidden="false"
//         >
//           <path
//             Rfillrule="evenodd"
//             d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
//             clip-rule="evenodd"
//           />
//         </svg>
//       </span>
//     </button>
//   </div>
// </div>
