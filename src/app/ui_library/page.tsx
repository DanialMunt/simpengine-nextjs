import React from 'react'

 import { Button } from "@/components/ui/button/button";
import { Input } from '@/components/ui/input/input';

// import { Button } from '@/components/ui/button';
const UILibrary = () => {
    return (
        <div className='flex flex-col  gap-3'>
            {/* BUTTONS */}
            <div className="flex flex-col">
                <h1 className='text-2xl'>Buttons</h1>
                <div className="flex gap-3">
                    <Button>Default</Button>
                    <Button variant="destructive">Delete</Button>
                    <Button variant="outline"  >Small</Button>
              
                </div>
            </div>

            {/* INPUTS */}
            <div className="flex flex-col">
                <h1 className='text-2xl'>Inputs</h1>
                <div className="flex gap-3">
                    <Input type="email" placeholder='Email'></Input>
                </div>
            </div>

            
        </div>
    )
}

export default UILibrary