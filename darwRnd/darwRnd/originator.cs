using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace darwRnd
{
    internal class originator
    {
        private string svg = "";
        private string data = "";
        public originator(){}
        public void makeShape1(String shapename,int num1 ,int num2,int num3 ,int num4,int num5,string path)
        {

            switch (shapename)
            {
                case "circle":
                    this.svg = "<circle z=\"" + num1 + "\"  cx=\"" + num2 + "\" cy=\"" + num3 + "\" r = \"" + num4 + "\" fill =\"black\"/>";
                    break;
                case "ellipes":
                    this.svg = "<ellipse z=\"" + num1 + "\"  cx=\"" + num2 + "\"cy=\"" + num3 + "\" rx=\"" + num4 + "\" ry=\"" + num4 * 0.45 + "\" />";
                    break;
                case "square":
                    this.svg = "<rect z=\"" + num1 + "\"  x=\"" + num2 + "\" y=\"" + num3 + "\" width=\"" + num4 + "\" height=\"" + num4 + "\" fill = \"black\"/>";
                    break;
                case "rectangle":
                    this.svg = "<rect z=\"" + num1 + "\"  x=\"" + num2 + "\" y=\"" + num3 + "\" width=\"" + num4 + "\" height=\"" + num5 + "\" fill = \"black\"/>";
                    break;
                case "line":
                    this.svg = "<line z=\"" + num1 + "\"  x1=\"" + num2 + "\" x2=\"" + num3 + "\" y1=\"" + num4 + "\" y2=\"" + num5 + "\" stroke=\"black\" stroke-width = \"5\"/>";
                    break;
                case "path":
                this.svg = "<path z=\"" + num1 + "\" d=\""+path+"\"/>";
                break;
                case"polyline":
                this.svg = "<polyline z=\""+num1+"\" points=\""+path+"\"/>";
                break; 
            }
            data = shapename + "(x: " + num2 + "y: " + num3 + "z: " + num1 + ")";
        }
        public mementoi makeMem(){
            return new ConMem(this.svg, data);
        }
        public void Restore(mementoi memento)
        {
            if (!(memento is ConMem))
            {
                throw new Exception("Unknown memento class " + memento.ToString());
            }

            this.svg = memento.getSvg();
            Console.Write($"Originator: My state has changed to: {svg}");
        }
    }
}
