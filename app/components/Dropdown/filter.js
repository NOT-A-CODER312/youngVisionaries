import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

export default function FilterDropdown({
  selectedKeys,
  setSelectedKeys,
  data,
  setMediaData,
}) {
  // const [selectedKeys, setSelectedKeys] = React.useState(
  //   new Set(["Sort by Date"])
  // );

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const sortByDateFunc = () => {
    const newData = data.sort((a, b) => {
      // Convert date strings to date objects
      let dateA = new Date(a.dateUploaded);
      let dateB = new Date(b.dateUploaded);

      // Compare the dates
      return dateA - dateB;
    });
    setMediaData(newData);
  };

  const sortBynameFunc = () => {
    const newData = data.sort((a, b) => a.title.localeCompare(b.title));
    setMediaData(newData);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="bordered"
          className="capitalize border-heart-pink font-Satisfy text-lg"
        >
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <DropdownItem
          key="Sort by Date"
          className=" hover:bg-heart-pink"
          onClick={sortByDateFunc}
        >
          Sort by Date
        </DropdownItem>
        <DropdownItem key="Sort by Name" onClick={sortBynameFunc}>
          Sort by Name
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
