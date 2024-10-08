class MathsAPI {
    static API_URL() {
        return "http://localhost:5000/api/maths";
    }

    static async runTests() {
        const tests = [
            { url: `${this.API_URL()}?op=+&x=3&y=2` },                   
            { url: `${this.API_URL()}?op=-&x=10&y=5` },                  
            { url: `${this.API_URL()}?op=*&x=5&y=6` },                   
            { url: `${this.API_URL()}?op=/&x=10&y=2` },                  
            { url: `${this.API_URL()}?op=%&x=10&y=3` },                  
            { url: `${this.API_URL()}?op=!&n=5` },                       
            { url: `${this.API_URL()}?op=p&n=7` },                       
            { url: `${this.API_URL()}?op=np&n=5` },                      
            { url: `${this.API_URL()}?op=*&x=10&y=abc` }, 
            { url: `${this.API_URL()}?op=&x=10&y=5` },  
            { url: `${this.API_URL()}?op=/&x=10&y=0` },  
            { url: `${this.API_URL()}?op=%&x=10&y=abc` }, 
            { url: `${this.API_URL()}?op=!&n=-5` }, 
            { url: `${this.API_URL()}?op=p&n=-7` }, 
            { url: `${this.API_URL()}?op=np&n=-1` }, 
            { url: `${this.API_URL()}?op=+&x=-111&y=-244` },  
            { url: `${this.API_URL()}?op=-&x=1&y=abc` },    
            { url: `${this.API_URL()}?n=a&op=p` },    
            { url: `${this.API_URL()}?op=-&x=111&y=244` },  
            { url: `${this.API_URL()}?op=*&x=11.56&y=244.12345` }, 
            { url: `${this.API_URL()}?op=/&x=99&y=11.06` }, 
            { url: `${this.API_URL()}?op=/&x=99&y=0` }, 
            { url: `${this.API_URL()}?op=/&x=0&y=0` }, 
            { url: `${this.API_URL()}?op=%&x=5&y=5` }, 
            { url: `${this.API_URL()}?op=%&x=100&y=13` }, 
            { url: `${this.API_URL()}?op=%&x=100&y=0` }, 
            { url: `${this.API_URL()}?op=%&x=0&y=0` }, 
            { url: `${this.API_URL()}?n=0&op=!` }, 
            { url: `${this.API_URL()}?n=0&op=p` }, 
            { url: `${this.API_URL()}?n=1&op=p` }, 
            { url: `${this.API_URL()}?n=2&op=p` }, 
            { url: `${this.API_URL()}?n=5&op=p` }, 
            { url: `${this.API_URL()}?n=6&op=p` }, 
            { url: `${this.API_URL()}?n=6.5&op=p` }, 
            { url: `${this.API_URL()}?n=113&op=p` }, 
            { url: `${this.API_URL()}?n=114&op=p` }, 
            { url: `${this.API_URL()}?n=1&op=np` }, 
            { url: `${this.API_URL()}?n=30&op=np` }, 
            { url: `${this.API_URL()}?X=111&op=+&y=244` }, 
            { url: `${this.API_URL()}?Y=244&op=+&x=111` }, 
            { url: `${this.API_URL()}?op=+&x=111&y=244&z=0` }, 
            { url: `${this.API_URL()}?n=5&op=!&z=0` }, 
            { url: `${this.API_URL()}?n=5.5&op=!` },
            { url: `${this.API_URL()}?z=0` },
            { url: `${this.API_URL()}?n=-5&op=!` },
            { url: `${this.API_URL()}?x=null` }
        ];

        const results = []; 
        for (const test of tests) {
            try {
                const response = await fetch(test.url);
                const data = await response.json();

                let resultObject = { op: data.op, value: data.value, error: data.error};

                if (data.hasOwnProperty('x')) resultObject.x = data.x;
                if (data.hasOwnProperty('y')) resultObject.y = data.y;
                if (data.hasOwnProperty('n')) resultObject.n = data.n;

                results.push(resultObject); 
            } catch (error) {
                results.push({
                    op: '', 
                    value: null
                });
            }
        }

        return results; 
    }
}

export default MathsAPI;