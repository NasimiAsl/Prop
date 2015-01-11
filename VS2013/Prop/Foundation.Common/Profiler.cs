using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace System
{
    public delegate bool ProfilerEventHandler();
    public class Profiler
    {
        public class PointStruct
        {
            public string Key { get; set; }
            public string Script { get; set; }
            public long LastTick { get; set; }
            public long StartTick { get; set; }
        }

        public static Dictionary<string, PointStruct> PointQueue { get; set; }
        public static event ProfilerEventHandler DoProfiler;

        public static bool EnableProfiler { get; set; }

        public static List<String> Events { get; set; }

        public static int Indexer = 0;

        public static int EventQueueCapacity = 300;

        public static void LogEvent(string s, string tag = "info")
        {
            if (Events == null) Events = new List<string>();

            Events.Insert(0, "<prefix title='" + Indexer.ToString() + "'>" + DateTime.Now.ToString() + "</prefix>\t<" + tag + ">" + s + "</" + tag + ">");

            if (Events.Count > EventQueueCapacity && EventQueueCapacity > 10)
            {
                Events.RemoveAt(EventQueueCapacity);
                Events.RemoveAt(EventQueueCapacity - 1);
                Events.RemoveAt(EventQueueCapacity - 2);
                Events.Add("End Of Queue. just Log " + EventQueueCapacity + " Events. ");
            }

            Indexer++;
        }

        public static void LogEvent(string s , string alert, string tag = "error")
        {
            if (Events == null) Events = new List<string>();

            Events.Insert(0, "<prefix title='" + Indexer.ToString() + "'>" + DateTime.Now.ToString() +
                "</prefix>\t<" + tag + ">" + s + "<btn class='im' onclick='alert($(\"hidden\" ,this.parent).html());'>[more]</btn><hidden>"+alert+"</hidden></" + tag + ">");

            if (Events.Count > EventQueueCapacity && EventQueueCapacity > 10)
            {
                Events.RemoveAt(EventQueueCapacity);
                Events.RemoveAt(EventQueueCapacity - 1);
                Events.RemoveAt(EventQueueCapacity - 2);
                Events.Add("End Of Queue. just Log " + EventQueueCapacity + " Events. ");
            }

            Indexer++;
        }


        public static bool IsCheck()
        {
            if (DoProfiler != null)
                return DoProfiler();
            return EnableProfiler;
        }

        public static void Clear(string key = "default")
        {
            if (!IsCheck()) return;
            if (PointQueue == null) PointQueue = new Dictionary<string, PointStruct>();

            if (!PointQueue.Keys.Contains(key)) PointQueue.Add(key, new PointStruct() { Key = key, LastTick = -1, Script = string.Empty });
        }

        public static void Begin(string key = "default")
        {
    

            if (PointQueue == null) PointQueue = new Dictionary<string, PointStruct>();

            PointQueue.Remove(key);

            SetPoint(key, "begin");

        }

        public static void End(string key = "default")
        {  
            SetPoint(key, "end");
        }


        public static void SetPoint(string key = "default", string details = "", bool isLogEvent = true)
        {
            if (!IsCheck()) return;


            if (details == "begin")
                Clear(key);

            Indexer++;

            if (PointQueue == null) PointQueue = new Dictionary<string, PointStruct>();

            if (!PointQueue.Keys.Contains(key)) PointQueue.Add(key, new PointStruct() { Key = key, LastTick = -1, Script = string.Empty });

            if (!PointQueue.Keys.Contains(key) || PointQueue[key].LastTick == -1)
                PointQueue[key].LastTick = DateTime.Now.Ticks;

            if (details == "begin")
                PointQueue[key].StartTick = PointQueue[key].LastTick;

            var msValue = DateTime.Now.Ticks - PointQueue[key].LastTick;
            var msStartValue = DateTime.Now.Ticks - PointQueue[key].StartTick;

            var value = new DateTime(msValue);
            var st = (value.Minute * 60 + value.Second).ToString("00") + "." + value.Millisecond;
            var mvalue = new DateTime(msStartValue);
            var st1 = (mvalue.Minute * 60 + mvalue.Second).ToString("00") + "." + mvalue.Millisecond;


            PointQueue[key].LastTick = DateTime.Now.Ticks;

            var script = "";
            try { script = PointQueue[key].Script; }
            catch { }
            if (script == "")
            {
                script = "chart.add('" + key + "');";
            }

            script += "chart.add('" + key + "'," + msValue + ",'" + (st == "00.0" ? " " : st) + "<div class=dt>" + details + "<hr/>" + st1 + " - " + Indexer.ToString() + "</div>');";
            PointQueue[key].Script = script;

            if (isLogEvent)
                LogEvent(key + " >> " + details);
        }

        public static string GetScript(string key = "default", bool setFinish = false)
        {
            if (!IsCheck()) return "";
            if (!PointQueue.Keys.Contains(key)) PointQueue.Add(key, new PointStruct() { Key = key, LastTick = -1, Script = string.Empty });

            if (setFinish) SetPoint(key, "finish");
            try { return "<script>try{" + PointQueue[key].Script.ToString() + "; chart.draw('" + key + "');}catch(e){}</script>"; }
            catch { }
            return "";
        }
    }
}