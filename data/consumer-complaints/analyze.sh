## METADATA
# Complaint ID, Product, Sub-product, Issue, Sub-issue, State, ZIP code, Submitted via
# Date received, Date sent to company, Company, Company response, Timely response?, Consumer disputed?

# Only 12 kinds of 'products'
cut -f2 -d',' consumer_complaints.csv | sort -u | wc -l 
cut -f2 -d',' consumer_complaints.csv | sort | uniq -c > product_complaint_counts.txt

cut -f7 -d',' consumer_complaints.csv | sort | uniq -c > state_counts.txt