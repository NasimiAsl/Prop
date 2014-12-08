using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace System
{
    public static class CommunicationExtention
    {
        public static List<T> AddToList<T>(this List<T> l, T item, int? insertIndex = null)
        {
            if (!insertIndex.HasValue)
            {
                l.Add(item);
            }
            else
            {
                l.Insert(insertIndex.Value, item);
            }
            return l;
        }

        public static Dictionary<S, T> AddToDic<S,T>(this Dictionary<S, T> l, S key, T item)
        { 
            l.Add(key, item); 
            return l;
        }

        public static IDictionary<string, object> AddProperty(this object obj, string name, object value)
        {
            var dictionary = obj.ToDictionary();
            dictionary.Add(name, value);
            return dictionary;
        }

        // helper
        public static IDictionary<string, object> ToDictionary(this object obj)
        {
            IDictionary<string, object> result = new Dictionary<string, object>();
            PropertyDescriptorCollection properties = TypeDescriptor.GetProperties(obj);
            foreach (PropertyDescriptor property in properties)
            {
                result.Add(property.Name, property.GetValue(obj));
            }
            return result;
        }
    }


}
