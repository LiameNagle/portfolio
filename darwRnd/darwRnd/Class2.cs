using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace darwRnd
{
    internal class ConMem: mementoi// constroutor mementio
    {
        private string svg;
    private string data;
    public ConMem(string svg, string data)
    {
        this.svg = svg;
        this.data = data;

    }
    public string getData()// for data to print(generic) square(x,y,z)
    {
        return data;
    }



    public string getSvg()
    {
        return svg;
    }
}
}

/*
 * from originator i will create the svg line and data line which will be stored in the memento 
 * the menmento will then go into a list in the care taker 
 * the caretaker will then add the shape to the canvas if it is in the oncanvas list 
 * the caretaker will remove the shape if it is undone (not print it onto new canvas ) and add to removed list
 * the caretaker will add back shape if redo is called takeing fromthe removed list to the oncanvas list 
 */
