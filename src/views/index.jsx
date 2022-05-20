import {Fragment} from 'react';

function IndexPage(props){
    const self = props.extended;

    console.log(self);
    
    return (
        <Fragment>
            <div className="container-fluid d-flex flex-column bg-dark">
                <header>
                    <h1 className="py-4 px-3">React Vs PokeApi</h1>
                </header>
                <div id="container" className="p-3 mb-5 mx-auto" style={{width:'max-content'}}>

                    {/* Search Pokemon */}
                    <div>
                        <strong className="d-block text-light m-3">Enter a pokemon name, eg: Pekachu, Torterra, Jynx etc.</strong>
                        <form className="my-3 relative" onSubmit={(event)=>{
                                event.preventDefault();
                                
                                window.$('#spinner').fadeIn(100);
                                window.$('#search-input').blur();
                                
                                self.findPokemon(self.state.query);

                            }} spellCheck="false">

                            <input id="search-input" className="form-control pl-3 pt-3 pb-3" placeholder="Search Pokemon" style={{borderRadius:'40px', boxShadow:'none', border:'0', textTransform:'capitalize', paddingRight:'60px'}} defaultValue={self.state.pokemon.name} onChange={(event)=>{
                                self.setState({
                                    query: event.target.value.toLowerCase()
                                })
                            }}/>

                            <button className="absolute bg-light py-1 px-2 border-0" style={{borderRadius:'50%', right:'10px', transform:'translateY(-50%)', top:'50%', fontSize:'20px'}}><i className="fas fa-search" onClick={(event)=>{
                                event.preventDefault();
                                
                                window.$('#spinner').fadeIn(100);
                                window.$('#search-input').blur();
                                
                                self.findPokemon(self.state.query)

                            }}></i></button>
                        </form>
                        <div id="spinner" className="px-0 my-2 text-secondary" style={{display:'none'}}>
                            <i className="fad fa-spinner fa-spin" style={{color:'#0c77b5', fontSize:'24px'}}></i> Searching...
                        </div>
                    </div>

                    {/* Show Pokemon element */}
                    <div id="element" className="d-flex mx-auto py-2 px-3" style={{border:'1px solid #505050', width:'max-content', minHeight:'max-content', borderRadius:'10px'}}>

                        <div id="pokemon" style={{width:'350px', minWidth:'300px', marginRight:'20px'}} data-testid="pokemon">
                            <img src={self.state.pokemon.sprites.other['official-artwork'].front_default} alt="pokemon" style={{width:'100%'}}/>
                            <div className="mx-auto" style={{textAlign:'center', fontSize:'1.2rem'}}>
                                <label htmlFor="pokemon" className="text-secondary">{self.capitalize(self.state.pokemon.name)}</label>
                            </div>
                        </div>

                        <div id="description" style={{minWidth:'max-content', height:'max-content', borderLeft:'3px solid #181818', margin:'auto'}}>

                            <table>
                                <tbody>
                                    <tr><td><h2>Name</h2></td><td><>&nbsp;:&ensp;</></td><td><span>{self.capitalize(self.state.pokemon.name)}</span></td></tr>

                                    <tr><td><h2>Abilities</h2></td><td><>&nbsp;:&ensp;</></td><td><span>{
                                        (()=>{
                                            let abilities = [];
                                            for (var ab of self.state.pokemon.abilities){
                                                abilities.push(self.capitalize(ab.ability.name));
                                            }
                                            
                                            return abilities.join(', ');
                                        })()}
                                    </span></td></tr>

                                    <tr><td><h2 style={{verticalAlign:'top'}}>Statistics</h2></td>
                                    <td style={{verticalAlign:'top'}}><>&nbsp;:&ensp;</></td>
                                    <td><span className="d-block" style={{whiteSpace:'pre', paddiingRight:'12px'}}>{(()=>{
                                
                                        let s = "";
                                        for (var stats of self.state.pokemon.stats){
                                            s += '\t'+stats.stat.name+':  '+stats.base_stat+'\n';
                                        }
                                        
                                        let stat = `{\n${s}}`;
                                        return stat;

                                        })()}</span></td></tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default IndexPage;