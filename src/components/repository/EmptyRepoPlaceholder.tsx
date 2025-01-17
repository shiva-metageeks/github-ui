import React from 'react';

interface EmptyRepoPlaceholderProps {
  repoUrl: string;
}

const EmptyRepoPlaceholder: React.FC<EmptyRepoPlaceholderProps> = ({ repoUrl }) => {
  return (
    <div className="w-full text-white p-4 rounded-lg">
      <h2 className="text-xl font-bold">Git Repository Guide</h2>
      <p className="my-4">Follow these steps to push code to the repository:</p>
      <div className="grid grid-cols-1 gap-4">
        <div className="border border-gray-600 p-4 rounded-lg">
          <p className="font-bold">Clone the repository:</p>
          <code>git clone {repoUrl}</code>
        </div>
        <div className="border border-gray-600 p-4 rounded-lg">
          <p className="font-bold">Make changes to the code and add files to staging area:</p>
          <code>git add .</code>
        </div>
        <div className="border border-gray-600 p-4 rounded-lg">
          <p className="font-bold">Commit changes:</p>
          <code>git commit -m "Your commit message"</code>
        </div>
        <div className="border border-gray-600 p-4 rounded-lg">
          <p className="font-bold">Push changes to the repository:</p>
          <code>git push origin master</code>
        </div>
      </div>
    </div>
  );
};

export default EmptyRepoPlaceholder;