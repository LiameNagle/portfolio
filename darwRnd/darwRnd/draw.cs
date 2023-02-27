using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace darwRnd
{
    internal class draw
    {
        private List<mementoi> oncanvas = new List<mementoi>();
        private List<mementoi> offcanvas = new List<mementoi>();
        private originator ori = null;
        public draw(originator ori)
        {
            this.ori = ori;
        }
        public void newShape()
        {
            oncanvas.Add(ori.makeMem());
            string path = @".\output\print.svg";
            if (File.Exists(path))
            {
                File.Delete(path);
            }

            string temp = "";
            for (int i = 0; i < oncanvas.Count; i++)
            {
                temp += "\n" + oncanvas[i].getSvg();
                
            }Console.WriteLine(temp);

            using (FileStream fs = File.Create(path))
            {
                AddText(fs, "<svg width=\"500\" height=\"500\" xmlns=\"http://www.w3.org/2000/svg\">");
                AddText(fs, temp);
                AddText(fs, "</svg>");


            }
           //Console.WriteLine("added{ " + oncanvas[oncanvas.Count].getSvg());
        }
        public void undo()
        {
            if (this.oncanvas.Count == 0)// cant undo whats not there
            {
                return;
            }

            var memento = this.oncanvas.Last();
            this.oncanvas.Remove(memento);
            this.offcanvas.Add(memento);

            Console.WriteLine("Caretaker: Restoring state to: " + memento.getSvg());

            try
            {
                this.ori.Restore(memento);
            }
            catch (Exception)
            {
                this.undo();
            }
            string path = @".\output\print.svg";
            if (File.Exists(path))
            {
                File.Delete(path);
            }


            string temp = "";
            for (int i = 0; i < oncanvas.Count; i++)
            {
                temp += "\n" + oncanvas[i].getSvg();

            }

            using (FileStream fs = File.Create(path))
            {
                AddText(fs, "<svg width=\"500\" height=\"500\" xmlns=\"http://www.w3.org/2000/svg\">");
                AddText(fs, temp);
                AddText(fs, "</svg>");


            }
        }
        public void clear()
        {
            this.offcanvas = this.oncanvas;
            this.oncanvas.Clear();
            string path = @".\output\print.svg";
            if (File.Exists(path))
            {
                File.Delete(path);
            }
            using (FileStream fs = File.Create(path))
            {
                AddText(fs, "<svg width=\"500\" height=\"500\" xmlns=\"http://www.w3.org/2000/svg\">");
                AddText(fs, "</svg>");
            }

        }


        public void redo()
        {
            if (this.offcanvas.Count == 0)// cant redo whats not there
            {
                return;
            }
            var memento = this.offcanvas.Last();
            this.offcanvas.Remove(memento);
            this.oncanvas.Add(memento);

            Console.WriteLine("Caretaker: Restoring state to: " + memento.getSvg());

            try
            {
                this.ori.Restore(memento);
            }
            catch (Exception)
            {
                this.redo();
            }
            string path = @".\output\print.svg";
            if (File.Exists(path))
            {
                File.Delete(path);
            }


            string temp = "";
            for (int i = 0; i < oncanvas.Count; i++)
            {
                temp += "\n" + oncanvas[i].getSvg();

            }

            using (FileStream fs = File.Create(path))
            {
                AddText(fs, "<svg width=\"500\" height=\"500\" xmlns=\"http://www.w3.org/2000/svg\">");
                AddText(fs, temp);
                AddText(fs, "</svg>");


            }
        }
        private static void AddText(FileStream fs, string value)
        {
            byte[] info = new UTF8Encoding(true).GetBytes(value);
            fs.Write(info, 0, info.Length);
        }
    }

}
