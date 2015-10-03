{% extends 'layout.swig' %}

{% block content %}
  <h1>{{ status | default(500) }}.</h1>
  <p>{{ message | lower }}.</p>

  {% if stack %}
    <pre>{{ stack }}</pre>
  {% endif %}
{% endblock %}
