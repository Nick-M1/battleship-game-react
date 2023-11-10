import {Dispatch, Fragment, ReactNode, SetStateAction} from 'react'
import { Listbox, Transition } from '@headlessui/react'
import ChevronUpDownIcon from "../icons/ChevronUpDownIcon.tsx";
import CheckIcon from "../icons/CheckIcon.tsx";

type Props<T> = {
    id: string
    allOptions: T[]
    selected: T
    setSelected: Dispatch<SetStateAction<T>>

    anOptionToStringFunc: (option: T) => string
    anOptionToJSXFunc: (option: T) => ReactNode
}

export default function ImagesSelect<T>({ id, allOptions, anOptionToStringFunc, anOptionToJSXFunc, selected, setSelected }: Props<T>) {

    return (
        <div className="w-full">
            <Listbox value={selected} onChange={setSelected}>
                <div className="relative mt-1">
                    <Listbox.Button id={id} className="relative w-full cursor-default text-left input-primary">
                        <span className="block truncate capitalize pl-2">{anOptionToStringFunc(selected)}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
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
                        <Listbox.Options className="absolute z-20 mt-1 max-h-40 w-full overflow-auto scrollbar rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            { allOptions.map((item) => (
                                <Listbox.Option
                                    key={anOptionToStringFunc(item)}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-2 sm:pl-4 pr-4 ${
                                            active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                        }`
                                    }
                                    value={item}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate capitalize text-sm sm:text-base ${
                                                    selected ? 'font-medium' : 'font-normal'
                                                }`}
                                            >
                                              { anOptionToJSXFunc(item) }
                                            </span>
                                            { selected && (
                                                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-amber-600">
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            )}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}