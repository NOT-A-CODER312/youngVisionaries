import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  cn,
} from "@nextui-org/react";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineKey } from "react-icons/hi";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useSession, signOut } from "next-auth/react";
import { FaWallet } from "react-icons/fa";
import { IoWalletOutline } from "react-icons/io5";

export default function NavDDown() {
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

  const { data: session } = useSession();

  return (
    <Dropdown>
      <DropdownTrigger>
        <div className=" rounded-full bg-heart-yellow w-[32px] h-[32px]  flex items-center justify-center  font-Press2p text-base">
          {session?.user?.username?.replace("admin-", "").at(0)?.toUpperCase()}
        </div>
      </DropdownTrigger>
      <DropdownMenu
        variant="faded"
        aria-label="Dropdown menu with icons"
        className=" w-[200px]"
      >
        <DropdownItem
          key="email"
          //   shortcut="⌘N"
          startContent={
            <div className=" rounded-full bg-heart-yellow w-[28px] h-[28px]  flex items-center justify-center  font-Press2p text-sm ">
              {session?.user?.username
                ?.replace("admin-", "")
                .at(0)
                ?.toUpperCase()}
            </div>
          }
          endContent
          showDivider
        >
          {session?.user?.username?.replace("admin-", "")}
        </DropdownItem>
        <DropdownItem
          key="copy"
          //   shortcut="⌘C"
          startContent={<FaRegUser className={iconClasses} />}
          className=" font-Space_Mono"
        >
          <div className="font-Space_Mono text-[.8rem]">Profile</div>
        </DropdownItem>
        <DropdownItem
          key="copy"
          //   shortcut="⌘C"
          startContent={<IoWalletOutline className={iconClasses} />}
          className=" font-Space_Mono"
        >
          <div className="font-Space_Mono text-[.8rem]">Wallet</div>
        </DropdownItem>
        <DropdownItem
          key="edit"
          //   shortcut="⌘⇧E"
          startContent={<HiOutlineKey className={iconClasses} />}
          className=" font-Space_Mono  text-[.2rem] "
        >
          <div className="text-[.8rem]">Membership</div>
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          //   shortcut="⌘⇧D"
          startContent={
            <RiLogoutCircleLine className={cn(iconClasses, "text-danger")} />
          }
        >
          <button
            className=" font-Space_Mono  text-[.8rem] "
            onClick={() => signOut()}
          >
            Log Out
          </button>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
