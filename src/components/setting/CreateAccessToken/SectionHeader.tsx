import React from "react";

interface SectionHeaderProps {
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return <h2 className="text-base font-semibold text-stone-300">{title}</h2>;
};

export default SectionHeader;
