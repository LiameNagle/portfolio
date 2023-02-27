using System.Text;
using System;
using System.Collections.Generic;
using System.IO;
using System.Security.AccessControl;

namespace darwRnd
{
    class Proagram
    {
        static void Main(string[] args)
        {
            bool exit = false;
            int shapeindex = -1;
            originator ori;
            ori = new originator();
            draw canvas = new draw(ori);
            while (!exit)
            {
                shapeindex++;
                //Console.Clear();
                Console.WriteLine("input commands (h for help)");
                Random rnd = new Random();
                string choice = Console.ReadLine();

                if (choice[0] != 'A')
                {
                    switch (choice[0])
                    {
                        case 'H': Console.WriteLine(" Commands:\t\r\n\t \t H\t \t Help\t-\tdisplays\tthis\tmessage\t\r\n\t \t A\t<shape>\t Add\t<shape\tto\tcanvas\t\r\n\t \t U\t \t Undo\tlast\toperation\t\r\n\t \t R\t \t Redo\tlast\toperation\t\r\n\t \t C\t \t Clear\tcanvas\t\r\n\t \t Q\t \t Quit\tapplication\t"); break;
                        case 'R': canvas.redo(); break;
                        case 'U': canvas.undo(); break;
                        case 'C': canvas.clear(); break;
                        case 'Q': exit = true; break;

                    }
                }
                else
                {
                    switch (choice.Substring(2))
                    {
                        case "circle":
                            ori.makeShape1("circle", rnd.Next(500), rnd.Next(500), rnd.Next(200), rnd.Next(200),0 ," ");
                            canvas.newShape();
                            break;
                        case "square":
                            ori.makeShape1("square", rnd.Next(500), rnd.Next(500), rnd.Next(200), rnd.Next(200),0 ," ");
                            canvas.newShape();
                            break;
                        case "rectangle":
                            ori.makeShape1("rectangle", rnd.Next(500), rnd.Next(500), rnd.Next(200), rnd.Next(200),rnd.Next(200) ," ");
                            canvas.newShape();
                            break;
                        case "eclips":
                            ori.makeShape1("elipis", rnd.Next(500), rnd.Next(500), rnd.Next(200), rnd.Next(200),0 ," ");
                            canvas.newShape();
                            break;
                        case "path":// path rnd is made in path string v
                            string path = "M " + rnd.Next(250)+" "+rnd.Next(250)+ " C "+ rnd.Next(250)+" "+rnd.Next(250)+", "+rnd.Next(250)+" "+rnd.Next(250)+", "+rnd.Next(250)+" "+rnd.Next(250);
                            ori.makeShape1("path", rnd.Next(500), rnd.Next(500), rnd.Next(200), rnd.Next(200),0,path);
                            canvas.newShape();
                            break;
                        case "polyline":// same for polyline
                        string points = ""+rnd.Next(250)+","+rnd.Next(250)+" "+rnd.Next(250)+","+rnd.Next(250)+" "+rnd.Next(250)+","+rnd.Next(250)+" "+rnd.Next(250)+","+rnd.Next(250);
                            ori.makeShape1("polyline", rnd.Next(500), rnd.Next(500), rnd.Next(200), rnd.Next(200),0,points);
                            canvas.newShape();
                            break;
                        case "line":
                            ori.makeShape1("line",rnd.Next(500), rnd.Next(500), rnd.Next(500), rnd.Next(200), rnd.Next(200) ," ");
                            canvas.newShape();
                            break;
                    }
                }
            }
        }
    }
}

