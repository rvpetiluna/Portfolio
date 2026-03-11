import React, { useState, useEffect } from 'react';

export default function Projects() {

    const [isLoading, setIsLoading] = useState(false);

    // Simulate a fake data fetch when the component mounts or refreshes
    useEffect(() => {
        const timer = setTimeout(() => {
            console.log('Fake reload complete');
        }, 200); // 200ms delay

        return () => clearTimeout(timer);
    }, []);

    const handleRefresh = () => {
        setIsLoading(true);
        
        // Simulate API call duration
        setTimeout(() => {
            setIsLoading(false);
        }, 300);
    };

    return (
        <div className='projects_container'>
            <div className='projects_topbar'>
                <div className='projects_topbar_icons'
                >

                    <i className="hn hn-arrow-left-solid"></i>
                    <i className="hn hn-arrow-right-solid"></i>
                    <i className="hn hn-arrow-up-solid"></i>
                    <i 
                        className="hn hn-refresh-solid refresh-btn-icon" 
                        onClick={handleRefresh}
                        role="button"
                        tabIndex={0}
                    ></i>
                </div>

                    <div style={{
                        background:"rgb(56, 56, 56)", 
                        width:"40vw", height:"2rem",
                        display:"flex",
                        borderRadius:"5px",
                        alignItems:"center",
                        justifyContent:"center",
                        }}>
                        searchbar
                    </div>
            </div>
            <div className='projects_parentbox'>
                {isLoading ? (
                    <div style={{height: '100%', width:"100%",display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <i className="hn hn-spinner-solid"></i>
                    </div>
                ) : (
                    <>
                        <div className='projects_box1'>asd</div>
                        <div className='projects_box2'>asd     </div>
                        <div className='projects_box3'>asd</div>
                    </>
                )}

            </div>
        </div>
    );
}