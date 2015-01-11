using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace System
{

    public class ValidationBase
    {
        public ValidationBase()
        {
            ValidationMessages = new List<string>();
        }

        public List<string> ValidationMessages { get; set; }

        public bool ObjectInstanceIsValid
        {
            get
            {
                if (ValidationMessages != null && ValidationMessages.Count > 0)
                    return false;

                return true;
            }
        }

        public string ValidationMessage()
        {
            StringBuilder builder = new StringBuilder();
            foreach (var vm in ValidationMessages)
            {
                builder.Append(vm).Append("<br />");
            }
            return builder.ToString();
        }

        public string ValidationMessage(string separator)
        {
            StringBuilder builder = new StringBuilder();
            foreach (var vm in ValidationMessages)
            {
                builder.Append(vm).Append(separator);
            }
            return builder.ToString();
        }
    }

}
