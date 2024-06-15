import React from 'react'



interface WidgetProps {
  type: string;
}

const Widget: React.FC<WidgetProps> = ({ type }) => {
  let data: {
    title: string;
    isUser: boolean;
  };
  const amount = 10000;

  switch (type) {
    case 'user':
      data = {
        title: 'Number of Students',
        isUser: true,
      };
      break;
    case 'agent':
      data = {
        title: 'Number of Questions',
        isUser: true,
      };
      break;
    case 'form':
      data = {
        title: 'Sloved Questions',
        isUser: true,
      };
      break;
    
    
    default:
      data = {
        title: '',
        isUser: false,
      };
      break;
  }
  return (
    <div className="flex rounded border border-blue-500 bg-white text-black items-center p-4 g-4 shadow-md ">
            <div className="flex flex-col justify-evenly">
              <span className="font-bold">{data.title}</span>
             <span className="text-2xl font-light">{data.isUser && ''} {amount}</span>
            </div>
          </div>
  );
    };
        
export default Widget;
