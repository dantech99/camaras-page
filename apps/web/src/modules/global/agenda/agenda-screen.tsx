"use client";

import { Button } from "@camaras/ui/src/components/button";
import { defineStepper } from "@stepperize/react";

const stepper = defineStepper(
  {
    id: "step-1",
    title: "Step 1",
    description: "Description for step 1",
  },
  {
    id: "step-2",
    title: "Step 2",
    description: "Description for step 2",
  },
  {
    id: "step-3",
    title: "Step 3",
    description: "Description for step 3",
  },
  {
    id: "step-4",
    title: "Step 4",
    description: "Description for step 4",
  }
);

export function AgendaScreen() {
    const methods = stepper.useStepper();

    return (
        <div className="flex flex-col gap-4 py-16">
            <div className="flex justify-between">
                <Button onClick={() => methods.prev()}>
                    Anterior
                </Button>
                <Button onClick={() => methods.next()}>
                    Siguiente
                </Button>
                {
                    methods.switch({
                        "step-1": (step) => <StepOne />,
                        "step-2": (step) => <StepTwo />,
                        "step-3": (step) => <StepThree />,
                        "step-4": (step) => <StepFour />,
                    })
                }
            </div>
        </div>
    )
}

const StepOne = () => {
    return <div className="h-[100dvh] flex items-center justify-center">Step One</div>
}

const StepTwo = () => {
    return <div className="h-[100dvh] flex items-center justify-center">Step Two</div>
}
    

const StepThree = () => {
    return <div className="h-[100dvh] flex items-center justify-center">Step Three</div>
}

const StepFour = () => {
    return <div className="h-[100dvh] flex items-center justify-center">Step Four</div>
}
