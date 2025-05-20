"use client";

import { SelectPhotographer } from "@/modules/agenda/select-photographer";
import { defineStepper } from "@stepperize/react";
import { Progress } from "@camaras/ui/src/components/progress";

const stepper = defineStepper(
  {
    id: "step-1",
    title: "Step 1",
    description: "Description for step 1",
    percentage: 25,
  },
  {
    id: "step-2",
    title: "Step 2",
    description: "Description for step 2",
    percentage: 50,
  },
  {
    id: "step-3",
    title: "Step 3",
    description: "Description for step 3",
    percentage: 75,
  },
  {
    id: "step-4",
    title: "Step 4",
    description: "Description for step 4",
    percentage: 100,
  }
);

export function AgendaScreen() {
    const methods = stepper.useStepper();

    return (
        <div className="flex flex-col gap-4 p-4 py-12 md:p-24 justify-center items-center">
          <div className="w-full max-w-7xl text-primary">
            <Progress value={methods.current.percentage} className="w-full h-2" />
          </div>
            <div className="w-full max-w-7xl">
                {
                    methods.switch({
                        "step-1": () => <SelectPhotographer />,
                        "step-2": () => <StepTwo />,
                        "step-3": () => <StepThree />,
                        "step-4": () => <StepFour />,
                    })
                }
            </div>
        </div>
    )
}

const StepTwo = () => {
    return <div className="flex items-center justify-center">Step Two</div>
}
    

const StepThree = () => {
    return <div className="flex items-center justify-center">Step Three</div>
}

const StepFour = () => {
    return <div className="flex items-center justify-center">Step Four</div>
}
