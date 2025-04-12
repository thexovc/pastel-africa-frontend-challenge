export interface DropdownItem {
  icon: string;
  title: string;
  description: string;
}

export interface DropdownData {
  type: "product" | "resources" | "support";
  items: DropdownItem[];
}
