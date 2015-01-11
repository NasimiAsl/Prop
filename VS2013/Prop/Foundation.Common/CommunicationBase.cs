//
//         Copyright (c) NiazeRooz.  All rights reserved. 
//
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Reflection;

//
//      It is maybe Used For any class (convertion class , xinfo ,View, Partial, ...) then
//      Add To Global System namespace (No Need Add reference in class header...)
// 
namespace System
{
    /// <summary>
    /// 
    ///     object between the two objects used in Adaptor Patern (* the related sample is brought below).
    ///       
    /// 
    ///     Struct : 
    ///     ┌─────────────────────┐          ┌───────────────────┐
    ///     │  CommunicationBase  ├──┬──── ○ │  ICommunication   │
    ///     └────────┬────────────┘  │       └───────────────────┘
    ///              ↑               │
    ///      ┌───────┴───────────┐   │
    ///      │  ICommunication   ├ ← ┘  list 
    ///      └───────────────────┘
    ///      
    ///     object instance  : { class d:{a: 1 , b : 2  } , c : 3 }
    ///     after convert to communicationbase instance :
    ///     com →
    ///       + com → : { name:d }
    ///           + com :{ name:a , value: 1}
    ///           + com :{ name:b , value: 2}
    ///       + com :{ name:c , value: 3}
    ///       
    /// </summary>

    #region Adaptor Pattern
    /* 
     class A
     {
        public A(){ Property1 = "value1";  }
        public object Property1 {get;set}
        public string Property2 {get;set}     
     }
      
     class B
     {
        public B(){ Property1 = "value2";  }
        public object Property1 {get;set} 
     }
     
     ──────────────────────────────────────────────────────────────────
     var a = new A();                                               
     // Class A Send Content Data To  CommunicationBase
     var com = a.To(new CommunicationBase()); 
          
     //Class B Fetch Data From Comunication Object
     var b = com.To(new B());
     
     //Class B Fetch Data From Class A
     var b = a.To(new B());   
     
     */
    #endregion

    public class CommunicationBase : List<ICommunication>, ICommunication
    {
        public CommunicationBase()
            : base()
        {
        }

        /// <summary>
        /// property name
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// property value
        /// </summary>
        public object Value { get; set; }

        /// <summary>
        /// keeps object graph information
        /// </summary>
        public PropertyInfo Property { get; set; }

        /// <summary>
        /// overriden method
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            var result = "{";
            if (Count > 0)
            {
                foreach (var item in this)
                {
                    result += item.Name + ":" + item.Value + ",";
                }

                result = (result + ",").Replace(",,", "}");

                return result;
            }
            else
            {
                return (string.IsNullOrEmpty(Name) ? "" : Name + ":") + (Value == null ? "" : Value.ToString());
            }
        }

        public string ToString(bool attachEmpty, bool useQuotationForString)
        {
            var result = "{";
            var qChar = "'";
            if (!useQuotationForString) qChar = "";
            if (Count > 0)
            {
                foreach (var item in this)
                {
                    var qAttach = (item.Value != null && item.Value.GetType() == typeof(string) ? qChar : "");

                    if (attachEmpty || (item.Value != null && (item.Value.GetType() != typeof(string) || item.Value.ToString().Trim() != "")))
                    {
                        result += item.Name + ":" + qAttach + item.Value + qAttach + ",";
                    }
                }

                result = (result + ",").Replace(",,", "}");

                return result;
            }
            else
            {
                var qAttach = (Value != null && Value.GetType() == typeof(string) ? qChar : "");

                return (string.IsNullOrEmpty(Name) ? "" : Name + ":") + (Value == null ? "" : qAttach + Value.ToString() + qAttach);
            }
        }


        /// <summary>
        ///  
        ///     this attributes Help for communication between source object and destination object
        ///     you can choose the way how to Usethis Method
        ///     this attribute Used For composited System (See Xinfo)
        /// 
        /// </summary>
        public Dictionary<string, object> Attributes { get; set; }

        /// <summary>
        /// 
        ///     this Property filled when tha source Object Converted to Communication
        ///     you have all info about source Property 
        ///     * Just the source Instance is not dispose or communication object not created by serialized info or database info
        /// 
        /// </summary>
        public PropertyTypes PropertyType { get; set; }


        /// <summary>
        /// 
        ///  Use To Assign And Build Parent Property
        /// 
        /// </summary>
        public static String PatternJoint { get; set; }

        /// <summary>
        /// 
        ///     this Property used when tha source Object Converted to Communication
        ///     this attributes Help for communication between source object and destination object
        ///     this attribute Used For composited System (See Xinfo)
        ///     
        /// </summary>
        public enum PropertyTypes
        {
            Array,
            Anonymous,
            Enum,
            List,
            Dictionary,
            Class,
            Object,
            Communication
        }


    }

    /// <summary>
    /// 
    ///    Helper Extention Method For Communication
    /// 
    /// </summary>
    public static class CommunicationHelperExtension
    {

        /// <summary>
        /// 
        ///     Add New Item To List And Create List 
        /// 
        /// </summary>
        /// <typeparam name="T">Generic Type</typeparam>
        /// <param name="l">base List</param>
        /// <param name="item">new Item For Add</param>
        /// <returns></returns>

        public static List<T> AddItem<T>(this List<T> l, T item)
        {
            if (l == null) l = new List<T>();

            l.Add(item);

            return l;
        }
    }



}
