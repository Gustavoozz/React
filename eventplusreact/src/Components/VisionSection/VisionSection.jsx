import React from 'react';
import Title from '../Title/Title';
import './VisionSection.css'

const VisionSection = () => {
    return (
        <section className='vision'>
            <div className='vision__box'>
                <Title 
                titleText={"Visão"}
                color='white'
                additionalClass='vision__title'
                />

                <p className='vision__text'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur officia eligendi porro commodi sequi neque nihil, laborum perferendis tempore aliquam doloremque! Adipisci sunt in aliquid similique soluta, iste deserunt assumenda. Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, iusto temporibus quod similique vero aliquam quas in sit fugit, eos nisi ab modi! Vero nostrum quos id aperiam, quod doloribus.</p>
            </div>

        </section>
    );
};

export default VisionSection;