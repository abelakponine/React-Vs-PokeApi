import {Fragment} from 'react';

function Page404(){

    return (
        <Fragment>
            <div className="container-fluid d-flex flex-column bg-dark">
                <header>
                    <h1 className="py-4 px-3">React Vs PokeApi</h1>
                </header>
                <div id="container" className="p-3 mb-5 mx-auto" style={{width:'max-content', textAlign:'center'}}>

                    {/* 404 Not Found */}
                    <h2 className="error-text" style={{fontSize:'22px'}}>{"{{ Error 404 Not Found! }}"}</h2>
                    <a href="/" className="text-white" style={{textDecoration:'none'}}>Go Back</a>
                </div>
            </div>
        </Fragment>
    );
}

export default Page404;